class TwitchBot {
    constructor() {
        this.tmi = require('tmi.js');
        this.botCtrl = require('./controllers/botController');
        // const Channel = require('./models/model');

        this.config = {
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

        this.channels = [];
        this.client = new this.tmi.client(this.config);
        this.jdRegex = /^(jd|JD|jD|Jd)(\s|\n|\t|)|(\s(jd|JD|jD|Jd))+/g;
        this.that = this;

    }

    start() {
        this.botCtrl.get_all_channels(this.setup.bind(this));
    }

    setup(res) {
        this.config.channels = res.map(x => x.name);
        this.channels = res;

        this.startBot();
    }

    startBot() {
        this.client.connect();
        const that = this;
        setInterval(() => {
            console.log('Synchronizing channels...');
            this.channels.forEach(this.botCtrl.update_channel);
            this.botCtrl.get_all_channels(function (_channels) {
                _channels.forEach(function (channel) {
                    if (!channels.find(x => x.name === channel.name)) {
                        channels.push(channel);
                        this.client.join(channel.name)
                    }
                })

            });
            console.log('Channels synchronized!')
        }, 3 * 1000);
        this.client.on('chat', function (channel, userState, message, self) {
            if (self) return;
            handleMessage(channel, userState, message);

        });

        function handleMessage(channel, userState, message) {
            let channelName = channel.substring(1);
            let chan = that.channels.find(x => x.name === channelName);
            if (!chan) return;
            if (message.match(that.jdRegex))
                chan.jd_messages.push({user: userState['display-name'], message: message});
            chan.total_messages += 1;
        }


    }
}

module.exports = new TwitchBot();