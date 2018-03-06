// const express = require('express');
const path = require('path');
// const cluster = require('cluster');
// const numCPUs = require('os').cpus().length;
// const PORT = process.env.PORT || 5000;
//
// // Multi-process to utilize all CPU cores.
// if (cluster.isMaster) {
//     console.error(`Node cluster master ${process.pid} is running`);
//
//     // Fork workers.
//     for (let i = 0; i < numCPUs; i++) {
//         cluster.fork();
//     }
//
//     cluster.on('exit', (worker, code, signal) => {
//         console.error(`Node cluster worker ${worker.process.pid} exited: code ${code}, signal ${signal}`);
//         // console.log('Starting a new worker');
//         // cluster.fork();
//     });
//
// } else {
//     const app = express();
//     const mongoose = require('mongoose');
//     const Task = require('./models/model');
//     const bodyParser = require('body-parser');
//
//     mongoose.Promise = global.Promise;
//     mongoose.connect('mongodb://localhost/nodeTest');
//
//     app.use(bodyParser.urlencoded({extended: true}));
//     app.use(bodyParser.json());
//
//     // Priority serve any static files.
//     app.use(express.static(path.resolve(__dirname, '../react-ui/build')));
//
//     // Answer API requests.
//     const routes = require('./routes/routes');
//     routes(app);
//
//     // All remaining requests return the React app, so it can handle routing.
//     app.get('*', function (request, response) {
//         response.sendFile(path.resolve(__dirname, '../react-ui/build', 'index.html'));
//     });
//
//     app.listen(PORT, function () {
//         console.error(`Node cluster worker ${process.pid}: listening on port ${PORT}`);
//     });
// }

let express = require('express'),
    app = express(),
    port = process.env.PORT || 5000,
    mongoose = require('mongoose'),
    Task = require('./models/model'), //created model loading here
    bodyParser = require('body-parser');

// let aws = require('aws-sdk');
// let s3 = new aws.S3({
//     db_path: process.env.MONGODB_URI
// });

// mongoose instance connection url connection

// mongoose.Promise = global.Promise;
// mongoose.connect(process.env.MONGODB_URI);


app.use(bodyParser.urlencoded({extended: true}));

app.use(bodyParser.json());
app.get('*', function (request, response) {
    response.sendFile(path.resolve(__dirname, '../react-ui/build', 'index.html'));
});

let routes = require('./routes/routes'); //importing route
routes(app); //register the route


app.listen(port);


console.log('todo list RESTful API server started on: ' + port);