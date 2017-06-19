var reply_with_attachments = {
  'username': 'remoteapprentice' ,
  'text': 'Help commands',
  "mrkdwn": true,
  'attachments': [
    {
      'fallback': 'To be useful, I need you to invite me in a channel.',
      'title': 'Here is a list of commands I currently know:',
      'fields': [
        {
          'title': 'Input:',
          'value': 'uptime, identify yourself, who are you, what is your name',
          'short': true
        },
        {
          'title': 'Use:',
          'value': 'displays how long the bot has been running',
          'short': true
        },
        {
          'title': 'Input:',
          'value': 'what is my name, who am i',
          'short': true
        },
        {
          'title': 'Use:',
          'value': 'displays your username',
          'short': true
        },
        {
          'title': 'Input:',
          'value': 'call me <your_name>, my name is <your_name>',
          'short': true
        },
        {
          'title': 'Use:',
          'value': 'tell bot what your nickname is',
          'short': true
        },
        {
          'title': 'Input:',
          'value': 'wiki <your_query>',
          'short': true
        },
        {
          'title': 'Use:',
          'value': 'displays the Wikipedia page for a query',
          'short': true
        },
        {
          'title': 'Input:',
          'value': 'register <your_email>',
          'short': true
        },
        {
          'title': 'Use:',
          'value': 'tell bot your email address',
          'short': true
        }
      ],
      'color': '#7CD197',
      'mrkdwn_in': ["text"]
    }
  ],
  'icon_url': 'http://lorempixel.com/48/48'
}

module.exports = (handles, controller, bot) => {
controller.hears(handles,
    'direct_message,direct_mention,mention', function(bot, message) {
        bot.reply(message, reply_with_attachments);

    });
}