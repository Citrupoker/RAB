module.exports = (handles, controller, bot) => {

    /*var Upwork = require('upwork-api'),
        rl = require('readline'),
        JobSearch = require('upwork-api/lib/routers/jobs/search.js').Search,
        config = {
        consumer_key: process.env.UPWORK_KEY,
        consumer_secret: process.env.UPWORK_SECRET,
      },
        api = new Upwork(config),
        callbackUrl = 'Https://remoteapprentice-dev.herokuapp.com/upwork',
        access = {};

    api.getAuthorizationUrl(callbackUrl, function (error, url, requestToken, requestTokenSecret) {
        if (error) throw new Error('Can not get authorization url, error: ' + error);

        var interface = rl.createInterface(process.stdin, process.stdout);
        interface.question('Please, visit ' + url + ' and enter a verifier: ', function (verifier) {
            interface.close();
            process.stdin.destroy();

            api.getAccessToken(requestToken, requestTokenSecret, verifier, function (error, accessToken, accessTokenSecret) {
                if (error) throw new Error(error);
                access.token = accessToken;
                access.tokenSecret = accessTokenSecret;
              });
          });
      });

    controller.hears(handles, 'direct_message,direct_mention,mention', function (bot, message) {
        console.log(message.match[1], message.match[2]);
        if (message.match[1] == 'jobs') {
          var search_term = encodeURIComponent(message.match[2]);
            var jobs = new JobSearch(api);
            jobs.find({ title: search_term }, function (error, data) {
                if (error) console.log(error);

                data.forEach((job) => {
                    bot.reply(message, job.url);
                });
            });
        }



      });*/
  };
