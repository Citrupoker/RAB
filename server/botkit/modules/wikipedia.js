module.exports = (handles, controller, bot) => {
    var rp = require('request-promise');
    controller.hears(handles, 'direct_message,direct_mention,mention', function (bot, message) {
        console.log(message);
        console.log(message.match[1]);
        var search_term = encodeURIComponent(message.match[1]);
        var url = `https://en.wikipedia.org/w/api.php?action=opensearch&search=${search_term}&limit=1&format=json`;
        var options = {
            uri: url,
            json: true,
          };
        rp(options)
            .then(function (data) {
                console.log(data[3][0]);
                bot.reply(message, data[3][0]);
              })
            .catch(function (err) {
                console.log('error', err);
              });
      });
  };
