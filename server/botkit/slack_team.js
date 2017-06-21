
module.exports = () => {
    var rp = require('request-promise');
    var url = `https://slack.com/api/user.list?token=${process.env.SLACK_OAUTH_TOKEN}&pretty=1`;
    var options = {
        uri: url,
        json: true
    };
    rp(options)
        .then(function (data) {
            console.log(data);
        })
        .catch(function (err) {
            console.log('error', err);
        });

}
