'use strict';
let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let ChannelSchema = new Schema({
    name: {
        type: String,
        required: 'enter channel name'
    },
    Created_date: {
        type: Date,
        default: Date.now()
    },
    total_messages: {
        type: Number,
        default: 0
    },
    jd_messages: [{user: String, message: String, date: Date}]

});

module.exports = mongoose.model('Channels', ChannelSchema);
