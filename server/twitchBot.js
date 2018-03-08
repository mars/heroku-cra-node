module.exports = function () {

    const tmi = require('tmi.js');
    let botCtrl = require('./controllers/botController');
    let config = {
        options: {
            debug: true
        },
        connection: {
            cluster: 'aws',
            reconnect: true
        },
        identity: {
            username: 'jdpisarz',
            password: 'oauth:yzpsu4vbeow7v8utyunmyydmxssrlw'
        },
        channels: ['jdpisarz', 'nervarien', 'arquel', 'riot games', 'overpow', 'xayoo_']
    };

    let channels = [];
    let client = new tmi.client(config);
    let jdRegex = /^(jd|JD|jD|Jd)(\s|\n|\t|)|(\s(jd|JD|jD|Jd))+/g;

    botCtrl.get_all_channels(setup);

    function setup(res) {
        config.channels = res.map(x => x.name);
        channels = res;
        startBot();
    }

    function startBot() {
        client.connect();
        setInterval(function () {
            console.log('Update!');
            channels.forEach(botCtrl.update_channel);
            botCtrl.get_all_channels(function (_channels) {
                _channels.forEach(function (channel) {
                    if (!channels.find(x => x.name === channel.name)) {
                        channels.push(channel);
                        client.join(channel.name)
                    }
                })

            })
        }, 20 * 1000);

        client.on('chat', function (channel, userState, message, self) {

            if (self) return;
            handleMessage(channel, userState, message);

        });

        function handleMessage(channel, userState, message) {
            let channelName = channel.substring(1);
            let chan = channels.find(x => x.name === channelName);
            if (!chan) return;
            if (message.match(jdRegex))
                chan.jd_messages.push({user: userState['display-name'], message: message});
            chan.total_messages += 1;
        }


    }
};