var Twit = require('twit')

var T = new Twit({
  consumer_key: process.env.CONSUMER_KEY,
  consumer_secret: process.env.CONSUMER_SECRET,
  access_token: process.env.ACCESS_TOKEN,
  access_token_secret: process.env.ACCESS_TOKEN_SECRET,
  timeout_ms: 60 * 1000 // optional HTTP request timeout to apply to all requests.
})

var stream = T.stream('statuses/filter', { track: ['bananas', 'oranges', 'strawberries'] })

module.exports = function () {
    
    T.stream.on('direct_message', function(direct_message) {
      var message = {"text": direct_message}
      
    })
    
}