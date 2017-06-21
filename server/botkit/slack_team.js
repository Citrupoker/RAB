
module.exports = () => {
    var rp = require('request-promise');
    var url = `https://slack.com/api/users.list?token=${process.env.SLACK_OAUTH_TOKEN}&pretty=1`;
    var options = {
        uri: url,
        json: true
    };
    rp(options)
        .then(function (data) {
            console.log('ALL DATA', data);
            if (data.members[0].profile !== undefined) {
                for(var x in data.members[0]){
                    console.log('PROFILE DATA',data.members[0].profile[x]);
                }
            }

        })
        .catch(function (err) {
            console.log('error', err);
        });

}
