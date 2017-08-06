var Member = require('../../models/members');

module.exports = (handles, controller, bot) => {
    controller.hears(handles, 'ambient', function (bot, message) {
        if (message.channel === 'C5QGPRB52') {
            Member.findOne({ id: message.user }, (err, member) => {
                if (err) throw err;
                if (member.new) {
                    member.new = false;
                    member.save((err, member) => {
                        if (err) throw err;
                        console.log(member.name + ' is no longer a new member.');
                    });
                    bot.replyPrivate(message, 'Welcome to our Slack team. Use the #FAQ channel to learn more about Remote Apprentice.');
                }
            });
        }
    });
};
