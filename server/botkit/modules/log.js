

module.exports = (handles, controller, bot) => {
    controller.hears(handles,
        'direct_message,direct_mention,mention', function(bot, message) {
            (function(){
                var oldLog = console.log;
                console.log = function (msg) {
                    bot.reply(message, msg)
                    oldLog.apply(console, arguments);
                };
            })();
        });
}