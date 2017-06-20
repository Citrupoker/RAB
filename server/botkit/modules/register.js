module.exports = (handles, controller, bot) => {
    controller.hears(handles,
        'direct_message,direct_mention,mention', function(bot, message) {
            var email = message.match[1];
            controller.storage.users.get(message.user, function (err, user) {
                if (!user) {
                    user = {
                        id: message.user,
                    };
                }
                user.email = email;
                controller.storage.users.save(user, function (err, id) {
                    bot.reply(message, 'Got it now. Your email is ' + user.email);
                });
            });
    });

}