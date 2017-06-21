var mongoose = require('mongoose');
var Members = require('../../models/members')

module.exports = (handles, controller, bot) => {
    controller.hears(handles, 'direct_message', function(bot, message) {
        var rp = require('request-promise');
        var url = `https://slack.com/api/users.list?token=${process.env.SLACK_OAUTH_TOKEN}&pretty=1`;
        var options = {
            uri: url,
            json: true
        };
        rp(options)
            .then(function (data) {
                var email;
                data.members.forEach((member) => {
                    if (member.id === message.user) email = member.profile.email; 
                });
                
                //Look for email to be updated in the database
                Members.findOne({'email': email}, function(err, member) {
                    if(err) throw err
                    else if(!member) {
                        //If email is not in the database, notify the user they should register first
                        bot.reply(message, 'You haven\'t been registered yet. Please use the `register <your_email>` command to register.')
                    } else {
                        //If the email is in the database, start the conversation, asking the user for all the info
                        bot.startPrivateConversation(message, function(err, convo) {
                            if(!err) {
                                convo.say('Okay, let\'s review your information.')
                                    convo.ask('What is your name? ' + 
                                    '*Current (please answer _yes_ to keep it this way):*\n\n>' + member.name, function(response, convo) {
                                        if (response.text.toLowerCase() !== 'yes') member.name = response.text
                                        convo.next()
                                    })
                                    convo.ask('Please write a brief description about yourself. ' +
                                    '*Current (please answer _yes_ to keep it this way):*\n\n>' + member.desc, function(response, convo) {
                                        if (response.text.toLowerCase() !== 'yes') member.desc = response.text
                                        convo.next()
                                    })
                                    convo.ask('Nice! Tell us about your skills. (Separate by commas.) ' + 
                                    '*Current (please answer _yes_ to keep it this way):*\n\n>' + member.skills.join(','), function(response, convo) {
                                        if (response.text.toLowerCase() !== 'yes') member.skills = response.text.split(',')
                                        convo.next()
                                    })
                                    convo.ask('Okay. Now please paste your image url here. ' + 
                                    '*Current (please answer _yes_ to keep it this way):*\n\n>' + member.img, function(response, convo) {
                                        if (response.text.toLowerCase() !== 'yes') member.img = response.text
                                        convo.next()
                                    })
                                    convo.ask('Great! Now share the url to your personal website. ' + 
                                    '*Current (please answer _yes_ to keep it this way):*\n\n>' + member.website, function(response, convo) {
                                        if (response.text.toLowerCase() !== 'yes') member.website = response.text
                                        member.save(function(err, member) {
                                            if(err) throw err
                                            convo.say('Your information has been updated. Thank you.')
                                            convo.say(format_attachment(member))
                                            convo.next()
                                        })
                                    })
                            }
                        })
                    }
                })
            })
            .catch(function (err) {
                console.log('error', err);
            });
    })
}

function format_attachment(member) {
    return {
  'username': 'Remote Apprentice', 
  "mrkdwn": true,
          'attachments': [
          {
            'fallback':  'To be useful, I need you to invite me in a channel.',
            'color': '#36a64f',
            'pretext': member.name,
            'author_icon': 'http://flickr.com/icons/bobby.jpg',
            'title': member.website,
            'title_link': member.website,
            'text': member.desc,
            'fields': [
              {
                'title': 'Name:',
                'value': member.name,
                'short': true

              },
              {
                'title': 'Coach / Apprentice:',
                'value': member.coach ? "Coach" : "Apprentice",
                'short': true

              },
              {
                'title': 'Skills:',
                'value': member.skills.join(', '),
                'short': true

              },
              {
                'title': 'Roles:',
                'value': member.roles.join(', '),
                'short': true

              }
            ],
            'image_url': member.img,
            'thumb_url': 'http://example.com/path/to/thumb.png',
            'footer': 'Profile',
            'footer_icon': 'https://platform.slack-edge.com/img/default_application_icon.png'
          }
        ]
    }
} 
