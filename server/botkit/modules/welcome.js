var Member = require('../../models/members');

module.exports = (handles, controller, bot) => {
    controller.on(handles, function (bot, message) {
        if (message.channel === 'C5QGPRB52') {
            bot.startPrivateConversation(message, function (err, convo) {
                var name = message.user_profile.first_name;
                if (!err) {
                    convo.say(`Welcome ${name}. Thank you for joining our community. Please introduce yourself briefly in the #introductions channel. To learn more about Remote Apprentice, check out the #faq channel.`);
                    convo.next();
                }
            });
        }
    });
};
