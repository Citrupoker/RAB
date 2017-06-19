module.exports = (handles, controller, bot) => {
    controller.hears(handles,
        'direct_message,direct_mention,mention', function(bot, message) {
           controller.storage.users.get(message.user, function (err, user) {
            if (user && user.name) {
                bot.reply(message, user.name);
            } else {
                bot.reply(message, 'User not found.');
            }
        });
        });
}