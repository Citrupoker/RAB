module.exports = (handles, controller, bot) => {

    var Upwork = require('upwork-api'),
        rl = require('readline'),
        JobSearch = require('upwork-api/lib/routers/jobs/search.js').Search,
        config = {
        consumer_key: process.env.UPWORK_KEY,
        consumer_secret: process.env.UPWORK_SECRET,
      },
        api = new Upwork(config);

    controller.hears(handles, 'direct_message,direct_mention,mention', function (bot, message) {
        console.log(message.match[1], message.match[2]);
        if (message.match[1] == 'jobs') {
          var search_term = encodeURIComponent(message.match[2]);
          bot.reply(message, 'Test success');
        }

        var jobs = new JobSearch(api);
        jobs.find({ title: search_term }, function (error, data) {
            if (error) console.log(error);

            data.forEach((job) => {
                bot.reply(message, job.url);
              });
          });

      });
  };
