class TwitchBot {
    constructor() {
        this.tmi = require('tmi.js');
        this.botCtrl = require('./controllers/botController');

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
            channels: ['jdpisarz']
        };

        this.channels = [];
        this.client = new this.tmi.client(this.config);
        this.jdRegex = /^(jd|JD|jD|Jd)(\s|\n|\t|)|(\s(jd|JD|jD|Jd))+/g;
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
            that.channels.forEach(that.botCtrl.update_channel);
            that.botCtrl.get_all_channels(function (_channels) {
                _channels.forEach(function (channel) {
                    if (!that.channels.find(x => x.name === channel.name)) {
                        that.channels.push(channel);
                        that.client.join(channel.name)
                    }
                })

            });
        }, 10 * 1000);
        this.client.on('chat', function (channel, userState, message, self) {
            if (self) return;
            handleMessage(channel, userState, message);

        });

        function handleMessage(channel, userState, message) {
            let channelName = channel.substring(1);
            let chan = that.channels.find(x => x.name === channelName);
            if (!chan) return;
            if (message.match(that.jdRegex))
                chan.jd_messages.push({user: userState['display-name'], message: message, date: Date.now()});
            chan.total_messages += 1;
        }


    }
}

module.exports = new TwitchBot();