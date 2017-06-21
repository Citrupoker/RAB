
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
            for(var x in data.members){
            if (data.members[x].profile !== undefined) {
                console.log('PROFILE DATA',data.members[x].profile);
                }
            }

        })
        .catch(function (err) {
            console.log('error', err);
        });

}
