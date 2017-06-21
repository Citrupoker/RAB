var mongoose = require('mongoose');
var Members = require('../../models/members')

module.exports = (handles, controller, bot) => {
    controller.hears(handles,
        'direct_message', function(bot, message) {
            var email = message.match[1];
            
            //check email against db emails
            Members.findOne({'email': email}, function(err, member) {

                //if email is not already registered
                if (err) throw err
                else if (member) {
                    bot.reply(message, "You are already registered.");
                } else {
                     //add new user with email address
                     var newMember = new Members();
                    // trigger start of conversation
                     bot.startPrivateConversation(message, function(err, convo) {
                        if (!err) {
                            convo.say('Thank you. We need some information about you.');
                            convo.ask('What is your name?', function(response, convo) {
                                newMember.name = response.text;
                                convo.next();
                            });
                            convo.ask('Please write a brief description about yourself.', function(response, convo) {
                                newMember.desc = response.text;
                                convo.next();
                            });
                            convo.ask('Nice! Tell us about your skills. (Separate by commas.)', function(response, convo) {
                                newMember.skills = response.text.split(',');
                                convo.next();
                            });
                            convo.ask('Okay. Now please paste your image url here.', function(response, convo) {
                                newMember.img = response.text;
                                convo.next();
                            });
                            convo.ask('Great! Now share the url to your personal website.', function(response, convo) {
                                newMember.website = response.text;
                                newMember.email = email;
                                newMember.save(function(err, member) {
                                   if (err) throw err;
                                   convo.say(message, 'Congratulations! You have been registered.');
                                   convo.say(message, format_attachment(member));
                                });
                                convo.next();
                            });
                        }
                    })
                }
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