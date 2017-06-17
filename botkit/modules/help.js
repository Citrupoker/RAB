module.exports = (handles, controller, bot) => {
controller.hears(handles,
    'direct_message,direct_mention,mention', function(bot, message) {
        bot.reply(message, reply_with_attachments);

    });
}