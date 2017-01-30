const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.static(__dirname + '/../react-ui/build'));

app.get('/api', function (req, res) {
  res.set('Content-Type', 'application/json');
  res.send('{"message":"Hello from the custom server!"}');
});

app.listen(PORT, function () {
  console.log(`Listening on port ${PORT}`);
});
