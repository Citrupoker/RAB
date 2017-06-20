var format_attachment = function(name, coach, email, desc, skills, roles, img, website, profile_url ) {
    return {
  'username': 'Remote Apprentice', 
  "mrkdwn": true,
          'attachments': [
          {
            'fallback':  'To be useful, I need you to invite me in a channel.',
            'color': '#36a64f',
            'pretext': name,
            'author_icon': 'http://flickr.com/icons/bobby.jpg',
            'title': website,
            'title_link': website,
            'text': desc,
            'fields': [
              {
                'title': 'Name:',
                'value': name,
                'short': true

              },
              {
                'title': 'Coach / Apprentice:',
                'value': coach ? "Coach" : "Apprentice",
                'short': true

              },
              {
                'title': 'Skills:',
                'value': skills.join(', '),
                'short': true

              },
              {
                'title': 'Roles:',
                'value': roles.join(', '),
                'short': true

              }
            ],
            'image_url': img,
            'thumb_url': 'http://example.com/path/to/thumb.png',
            'footer': 'Profile',
            'footer_icon': 'https://platform.slack-edge.com/img/default_application_icon.png'
          }
        ]
    }
} 

var desc = "Hello everyone, my name is Evans Enonchong, and I am a full-stack MEAN developer. I specialize in developing bots, web scrapers, web crawlers, APIs, and web applications. I am a self taught developer, and I gained a lot experience working as a freelancer.  After becoming top rated on upwork, I wanted to help others become top rated too. Sometimes I wish i had a mentor, and that is what inspired me to create Remote Apprentice. I don't know everything; I just want to learn, and what I know, I want to share. I would like to be a coach, and an apprentice"
module.exports = (handles, controller, bot) => {
    controller.hears(handles,
        'direct_message,direct_mention,mention', function(bot, message) {
          
         
              bot.reply(message, format_attachment('Evans Enonchong', true, 'evansantonio32@gmail.com',desc, ['JavaScript','Web scraping', 'HMTL', 'CSS','Python'],['Admin', 'Apprentice', 'Coach', 'Owner'],"https://image.ibb.co/fvvW55/business.jpg","http://citrudev.com",message.match[1]))
           
        
        });
}