
module.exports = () => {
    var rp = require('request-promise');
    var url = `https://slack.com/api/users.list?token=${process.env.SLACK_OAUTH_TOKEN}&pretty=1`;
    var options = {
        uri: url,
        json: true
    };
    rp(options)
        .then(function (data) {
            console.log(data);
            if (data.members.profile !== undefined) console.log(data.members.profile);

        })
        .catch(function (err) {
            console.log('error', err);
        });

}
