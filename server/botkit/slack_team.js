var mongoose = require('mongoose');
var Members = require('../models/members');

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
            for(var x in data.members) {
                if(data.members[x].profile !== undefined) {
                    var profile = data.members[x].profile;
                    console.log('PROFILE DATA' + profile);
                    Members.findOne({'email': profile.email}, function(err, member) {
                        if(err) throw err;
                        else if(!member) {
                            var newMember = new Members();
                            newMember.coach = 'false';
                            newMember.name = profile.real_name;
                            newMember.email = profile.email;
                            newMember.img = profile.image_512;
                            
                            newMember.save(function(err, member) {
                                if(err) throw err;
                            });
                        }
                    });
                }
            }
        })
        .catch(function (err) {
            console.log('error', err);
        });

}
