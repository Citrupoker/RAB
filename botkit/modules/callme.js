module.exports = (handles, controller, bot) => {
    controller.hears(handles, 'direct_message,direct_mention,mention', function (bot, message) {
        var name = message.match[1];
        controller.storage.users.get(message.user, function (err, user) {
            if (!user) {
                user = {
                    id: message.user,
                };
            }
            user.name = name;
            controller.storage.users.save(user, function (err, id) {
                bot.reply(message, 'Got it. I will call you ' + user.name + ' from now on.');
            });
        });
    });
}