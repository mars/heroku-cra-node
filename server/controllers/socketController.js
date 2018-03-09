'use strict';

let mongoose = require('mongoose'),
    Channel = mongoose.model('Channels');

exports.get_all_channels = async function () {
    const channels = [];
    const cursor = Channel.find({}).cursor();
    await cursor.eachAsync(async function (channel) {
        channels.push(channel)
    });
    return channels;
};