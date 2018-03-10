'use strict';

let mongoose = require('mongoose'),
    Channel = mongoose.model('Channels');

exports.list_all_channels = function (req, res) {
    Channel.find({}, function (err, channel) {
        if (err)
            res.send(err);
        res.json(channel)
    });
};

exports.create_a_channel = function (req, res) {
    let new_channel = new Channel(req.body);
    new_channel.name = new_channel.name.toLowerCase();
    Channel.count({name: new_channel.name}, function (err, count) {
        if (err) {
            console.log(err);
            return;
        }
        if (count === 0)
            new_channel.save(function (err, channel) {
                if (err)
                    res.send(err);
                res.json(channel);
            });
    });


};

exports.read_a_channel = function (req, res) {
    Channel.findById(req.params.channelId, function (err, channel) {
        if (err)
            res.send(err);
        res.json(channel);
    });
};

exports.update_a_channel = function (req, res) {
    Channel.findOneAndUpdate({_id: req.params.channelId}, req.body, {new: true}, function (err, channel) {
        if (err)
            res.send(err);
        res.json(channel);
    });
};

exports.delete_a_channel = function (req, res) {
    Channel.remove({_id: req.params.channelId}, function (err, channel) {
        if (err)
            res.send(err);
        res.json({message: 'Channel successfully deleted'})
    });
};

exports.test = function (req, res) {
    res.send('Zakon "JD" się rozpadł. Mroczny lord Norbit "Dis" Gierc\'zak\n' +
        'Wraz ze swoią uczennicą Kiarą opanował twitch.tv time outując\n' +
        'Lub skazując na perma banicję wszystkich członków Zakonu. \n' +
        'Kristof "Arquel" Sau\'ć, gnebiony nieustannymi atakami ze \n' +
        'Strony wojsk dowodzonych przez lorda Snoowera musiał się \n' +
        'W końcu ugiąć, wprowadzając bezwzględną cenzurę między plebsami i subami.\n' +
        'Mody opuściła nadzieja, widząc, że ich mistrz został spaczony\n' +
        'Ciemną Stroną Gierczycy. Ostatni bastion zapomnianego już, lecz\n' +
        'Wciąż żywego i wolnego twitcha - stream Rycerza Zakonu "JD"\n' +
        'Remigius\'ha Overpałera Push\'a zaczął ulegać stopniowej zagładzie.\n' +
        'I kiedy wydawało się, że twitch.tv zmierza ku katastrofalnemu końcowi, pojawił\n' +
        'Się przebłysk nowego, lepszego jutra. Rycerz Push przyjął na swego \n' +
        'Padawana młodego i utalentowanego streamera Marcina "Xayoo" Majkuta,\n' +
        'Który nie lęka się potężnego, mrocznego imperium i jest zdeterminowany\n' +
        'By przywrócić Zakonowi "JD" dawną świetność. \n' +
        'Promyk nadziei wciąż się tli...')
};











