const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose  = require('mongoose');
const cluster = require('cluster');
const numCPUs = require('os').cpus().length;

const PORT = process.env.PORT || 5000;

// Multi-process to utilize all CPU cores.
if (cluster.isMaster) {
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
  mongoose.Promise = require('bluebird');
  const Bear = require('../models/Bear');
  const router = express.Router();

  // Priority serve any static files.
  app.use(express.static(path.resolve(__dirname, '../react-ui/build')));
  app.use(bodyParser.urlencoded({ extended : true }));
  app.use(bodyParser.json());
  // app.use(function(req, res, next) {
  //   res.header("Access-Control-Allow-Origin", "*");
  //   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  //   next();
  // });
  // check to see I if I need this...

  // connect to database
  mongoose.connection.openUri('mongodb://localhost/bears');

  // Answer API requests.
  app.get('/api', function (req, res) {
    res.set('Content-Type', 'application/json');
    res.send('{"message":"Hello from the custom server!"}');
  });

  router.use(function(res, req, next) {
    console.log("something is happening");
    next();
  })

  router.get('/', function(req, res) {
    res.json({ message: "Hello, welcome to our api!"})
  })

  router.route('/bears')

    .post(function(req, res){
      var bear = new Bear();
      bear.name = req.body.name;

      bear.save(function(err) {
          if(err)
            res.send(err);
          res.json({ message: "Bear is made, now is new Bear." })
        })
      })


    .get(function(req, res){
      Bear.find(function(err, bears){
        if(err)
          res.send(err)
        res.json(bears)
      })
    })

  router.route('/bears/:bear_id')

    .get(function(req, res){
      Bear.findById(req.params.bear_id, function(err, bear){
        if(err)
          res.send(err);
        res.json(bear)
      });
    })

    .put(function(req,res){
      Bear.findById(req.params.bear_id, function(err, bear){
        if(err)
          res.send(err);
        bear.name = req.body.name;

        bear.save(function(err) {
          if(err)
            res.send(err);
          res.json({ message: "Bear was saved very good" })
        })
      })
    })

    .delete(function(req, res){
      Bear.remove({
        _id: req.params.bear_id
      }, function(err, bear) {
        if(err)
          res.send(err);
          res.json({ message: "Now is dead bear."});
      });
    });

  app.use('/api', router);

  // All remaining requests return the React app, so it can handle routing.
  app.get('*', function(request, response) {
    response.sendFile(path.resolve(__dirname, '../react-ui/build', 'index.html'));
  });

  app.listen(PORT, function () {
    console.error(`Node cluster worker ${process.pid}: listening on port ${PORT}`);
  });
}
