'use strict';
let async = require('async');
const Channell = require('../models/model');

let mongoose = require('mongoose'),
    Channel = mongoose.model('Channels');

exports.save_channel = function () {

};
exports.get_all_channels = function (callback) {
    Channel.find({}, function (err, channels) {
        if (!err)
            callback(channels)
    })
};
exports.update_channel = function (channel) {
    Channel.update({name: channel.name}, {
        $set: {
            total_messages: channel.total_messages,
            jd_messages: channel.jd_messages
        }
    }, function (err, num) {
        if (err) {
            console.log('update_channel error:');
            console.log(err);
        }
    });

};
