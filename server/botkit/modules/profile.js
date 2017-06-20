var Members = require('../../models/members')

module.exports = (handles, controller, bot) => {
    controller.hears(handles,
        'direct_message,direct_mention,mention', function(bot, message) {
          
              Members.find({}, function(err, members){
                if (!err && members.length > 1){
                  members.forEach(function(member){
                  bot.reply(message, format_attachment(member))
                  })
                } else {
                  bot.reply(message, "no members found")
                }
              })
        });
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