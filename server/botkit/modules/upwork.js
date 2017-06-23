module.exports = (handles, controller, bot) => {
    var Upwork = require('upwork-api'),
        rl = require('readline'),
        JobSearch = require('upwork-api/lib/routers/jobs/search.js').Search;

    var config = {
        'consumer_key': process.env.upworkKey,
        'consumer_secret': process.env.upworkSecret
    };

    var api = new Upwork(config),
        callbackUrl = 'callback url',
        access = {};

    api.getAuthorizationUrl(callbackUrl, function(error, url, requestToken, requestTokenSecret) {
        if (error) throw new Error('Can not get authorization url, error: ' + error);

        var interface = rl.createInterface(process.stdin, process.stdout);
        interface.question('Please, visit ' + url + ' and enter a verifier: ', function(verifier) {
            interface.close();
            process.stdin.destroy();

            api.getAccessToken(requestToken, requestTokenSecret, verifier, function(error, accessToken, accessTokenSecret) {
                if (error) throw new Error(error);
                access.token = accessToken;
                access.tokenSecret = accessTokenSecret;
            });
        });
    });

    controller.hears(handles, 'direct_message, direct_mention, mention', function(bot, message) {
        var jobs = new JobSearch(api);
        jobs.find({'title': 'Web Developer'}, function(error, data) {
            if(error) console.log(error);
            
            data.forEach((job) => {
                bot.reply(message, job.url);
            });
        });
    });
}