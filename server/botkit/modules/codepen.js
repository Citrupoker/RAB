module.exports = (handles, controller, bot) => {
    var rp = require('request-promise');

    Object.size = function (obj) {
        var size = 0, key;
        for (key in obj) {
          if (obj.hasOwnProperty(key)) size++;
        }

        return size;
      };

    controller.hears(handles, 'direct_message', function (bot, message) {
        console.log(message);
        console.log(message.match[1]);
        var arg = encodeURIComponent(message.match[1]);
        if (arg == 'popular' || arg == 'picks' || arg == 'recent') {
          var url = `https://cpv2api.com/pens/${arg}`;
          var options = {
              uri: url,
              json: true,
            };
          rp(options)
              .then(function (data) {
                  for (var x = 0; x < Object.size(data.data[0]); x++) {
                    bot.reply(message, data.data[x].link);
                  }
                })
              .catch(function (err) {
                  console.log('error', err);
                });
        }else {
          bot.reply(message, 'That is not a known command. try popular, recent or picks');
        }

      });
  };
