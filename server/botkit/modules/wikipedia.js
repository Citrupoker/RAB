var winston = require('winston')

var logger = new (winston.Logger)({
    transports: [
        new (winston.transports.Console)(),
        new (winston.transports.File)({filename: 'bot.log'})
    ]
});
logger.on('logging', function (transport, level, msg, meta) {
    bot.say({
        text: level + ' ' + msg,
        channel: "C5ZDE7NPN"
    });
});

module.exports = (handles, controller, bot) => {
    var rp = require('request-promise');
    controller.hears(handles, 'direct_message,direct_mention,mention', function (bot, message) {
        logger.log(message)
        logger.log(message.match[1])
        var search_term = encodeURIComponent(message.match[1]);
        var url = `https://en.wikipedia.org/w/api.php?action=opensearch&search=${search_term}&limit=1&format=json`;
        var options = {
            uri: url,
            json: true
        };
        rp(options)
            .then(function (data) {
                logger.log(data[3][0])
                bot.reply(message, data[3][0]);
            })
            .catch(function (err) {
                logger.log('error', err);
            });
    });
}