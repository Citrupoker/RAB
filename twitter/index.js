var Twit = require('twit')
var request = require('request')
var T = new Twit({
  consumer_key: process.env.CONSUMER_KEY,
  consumer_secret: process.env.CONSUMER_SECRET,
  access_token: process.env.ACCESS_TOKEN,
  access_token_secret: process.env.ACCESS_TOKEN_SECRET,
  timeout_ms: 60 * 1000 // optional HTTP request timeout to apply to all requests.
})
var stream = T.stream('user', { stringify_friend_ids: true })


stream.on('direct_message', function (direct_message) {
  request.post(
      process.env.WEBHOOK,
    {
      json: {
        'attachments': [
          {
            'fallback': '@' + direct_message.direct_message.sender.screen_name + ' on Twitter says: ' + direct_message.direct_message.text,
            'color': '#36a64f',
            'pretext': 'Twitter Message',
            'author_name': '@' + direct_message.direct_message.sender.screen_name,
            'author_link': 'https://www.twitter.com/@' + direct_message.direct_message.sender.screen_name,
            'author_icon': 'http://flickr.com/icons/bobby.jpg',
            'title': direct_message.direct_message.sender.url,
            'title_link': direct_message.direct_message.sender.url,
            'text': direct_message.direct_message.sender.description,
            'fields': [
              {
                'title': 'Name:',
                'value': direct_message.direct_message.sender.name,
                'short': true

              },
              {
                'title': 'Message:',
                'value': direct_message.direct_message.text,
                'short': true

              },
              {
                'title': 'At:',
                'value': direct_message.direct_message.sender.created_at,
                'short': true

              }
            ],
            'image_url': direct_message.direct_message.sender.profile_image_url,
            'thumb_url': 'http://example.com/path/to/thumb.png',
            'footer': 'Twitter',
            'footer_icon': 'https://platform.slack-edge.com/img/default_application_icon.png'
          }
        ]
      }
    },
      function (error, response, body) {
        if (!error && response.statusCode == 200) {
          console.log(body)
        }
      }
      )
})

    
    
