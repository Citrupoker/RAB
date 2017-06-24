
module.exports = (handles, controller, bot) => {
    controller.hears(handles,
        'direct_message,direct_mention,mention', function(bot, message) {
            console.log(message.match[1], message.match[2])
            if(message.match[1] == 'dm'){
                var twitter_handle = encodeURIComponent(message.match[2]);
                var reply = encodeURIComponent(message.match[3]);
                bot.reply(message, 'Twitter dm test success' + twitter_handle + ' ' +  reply);
            }
        });
}