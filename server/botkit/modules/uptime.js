var os = require('os');

module.exports = (handles, controller, bot) => {
    controller.hears(handles,
        'direct_message,direct_mention,mention', function (bot, message) {

            var hostname = os.hostname();
            var uptime = formatUptime(process.uptime());

            bot.reply(message,
                ':robot_face: I am a bot named <@' + bot.identity.name +
                '>. I have been running for ' + uptime + ' on ' + hostname + '.');

          });

    function formatUptime(uptime) {
      var unit = 'second';
      if (uptime > 60) {
        uptime = uptime / 60;
        unit = 'minute';
      }

      if (uptime > 60) {
        uptime = uptime / 60;
        unit = 'hour';
      }

      if (uptime != 1) {
        unit = unit + 's';
      }

      uptime = uptime + ' ' + unit;
      return uptime;
    }

  };
