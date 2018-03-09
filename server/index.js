const express = require('express');
const socketIo = require('socket.io');
const http = require('http');
const bodyParser = require('body-parser');
const path = require('path');
const mongoose = require('mongoose');
const Channel = require('./models/model');
const bot = require('./twitchBot');
const socketCtrl = require('./controllers/socketController');
const PORT = process.env.PORT || 5000;
const app = express();


mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/nodeTest');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
// Priority serve any static files.
app.use(express.static(path.resolve(__dirname, '../react-ui/build')));

// Answer API requests.
let routes = require('./routes/routes'); //importing route
routes(app); //register the route

// All remaining requests return the React app, so it can handle routing.
app.get('*', function (request, response) {
    response.sendFile(path.resolve(__dirname, '../react-ui/build', 'index.html'));
});

const server = http.createServer(app);
const io = socketIo(server);

let interval;
io.on('connection', socket => {
    console.log('New client connected');
    if (interval) {
        clearInterval(interval)
    }
    interval = setInterval(() => getDataAndEmit(socket), 1000);
    socket.on('disconnect', () => {
        console.log('Client disconnected')
    })
});
const getDataAndEmit = async socket => {
    try {
        const channels = await socketCtrl.get_all_channels();
        socket.emit('from_api', channels)
    } catch (error) {
        console.error(`Socket error: ${error.code}`)
    }

};

server.listen(PORT, () => console.log(`Listening on port ${PORT}`));
bot.start();
