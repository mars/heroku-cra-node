'use strict';

module.exports = function (app) {
    let channel_ctrl = require('../controllers/controller');
    app.route('/channels')
        .get(channel_ctrl.list_all_channels)
        .post(channel_ctrl.create_a_channel);

    app.route('/channels/:channelId')
        .get(channel_ctrl.read_a_channel)
        .put(channel_ctrl.update_a_channel)
        .delete(channel_ctrl.delete_a_channel);

    app.route('/test')
        .get(channel_ctrl.test)
};