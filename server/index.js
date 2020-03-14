require('dotenv').config()
const express = require('express');
const path = require('path');
const cluster = require('cluster');
const numCPUs = require('os').cpus().length;
const bodyParser = require('body-parser');
const getConnection = require('./db')
const isDev = process.env.NODE_ENV !== 'production';
const PORT = process.env.PORT || 5000;

let db;
// Multi-process to utilize all CPU cores.
if (!isDev && cluster.isMaster) {
	console.error(`Node cluster master ${process.pid} is running`);

	// Fork workers.
	for (let i = 0; i < numCPUs; i++) {
		cluster.fork();
	}

	cluster.on('exit', (worker, code, signal) => {
		console.error(`Node cluster worker ${worker.process.pid} exited: code ${code}, signal ${signal}`);
	});

} else {
	const app = express();
	app.use(bodyParser.json())
	app.use(
		bodyParser.urlencoded({
			extended: true,
		}))
	// Priority serve any static files.
	app.use(express.static(path.resolve(__dirname, '../react-ui/build')));



	// Answer API requests.
	app.get('/api', function (req, res) {
		res.set('Content-Type', 'application/json');
		res.send('{"message":"Hello from the custom server!"}');
	});

	app.post('/api/register', async function (req, res) {
		const {
			helpProvider,
			phoneNumber,
			need,
			location,
			helpGivingRadius
		} = req.body;

		try {
			const request = await db.query(
				'INSERT INTO requests(isprovider, phonenumber, need, location, radius) VALUES ($1, $2, $3, $4, $5)',
				[helpProvider, phoneNumber, need, location, helpGivingRadius])
			res.status(201).json({ success: true, requestCreatedId: request.insertId })

		} catch (error) {
			console.log(error)
			res.status(500).json({ success: false })
		}
	});

	// All remaining requests return the React app, so it can handle routing.
	app.get('*', function (request, response) {
		response.sendFile(path.resolve(__dirname, '../react-ui/build', 'index.html'));
	});

	app.listen(PORT, async function () {
		db = await getConnection();
		console.error(`Node ${isDev ? 'dev server' : 'cluster worker ' + process.pid}: listening on port ${PORT}`);
	});
}
