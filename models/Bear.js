const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
const Schema = mongoose.Schema;

const BearSchema = new Schema({
  name: String,
});

module.exports = mongoose.model('Bear', BearSchema);
