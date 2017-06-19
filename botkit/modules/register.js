module.exports = (handles, controller, bot) => {
    controller.hears(handles,
        'direct_message,direct_mention,mention', function(bot, message) {
            console.log(message);
           controller.storage.users.get(message.user, function (err, user) {
            if (user && user.name) {
                bot.reply(message, user.name);
                console.log(user);
            } else {
                bot.reply(message, 'User not found.');
            }
        });
        });
}