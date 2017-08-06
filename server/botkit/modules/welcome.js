var Member = require('../../models/members');

module.exports = (handles, controller, bot) => {
    controller.on(handles, function (bot, message) {
        console.log(message);
        if (message.channel === 'C5QGPRB52') {
            bot.startPrivateConversation(message, function (err, convo) {
                if (!err) {
                    convo.say('Welcome to our Slack team. Use the #faq channel to learn more about Remote Apprentice.');
                    convo.next();
                }
            });
        }
    });
};
