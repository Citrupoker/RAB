var reply_with_attachments = {
  'username': 'remoteapprentice' ,
  'text': 'Help commands',
  "mrkdwn": true,
  'attachments': [
    {
      'fallback': 'To be useful, I need you to invite me in a channel.',
      'title': 'Here is a list of commands I currently know:',
      'text': '*uptime, identify yourself, who are you, ' + 
        'what is your name* - displays how long the bot has been running \n\n' +
        '*what is my name, who am i* - displays your username \n\n' +
        '*call me <your_name>, my name is <your_name>* - tell bot what your nickname is\n\n' +
        '*wiki <your_query>* - displays the Wikipedia page for a query\n\n' +
        '*register <your_email>* - tell bot your email address',
      'color': '#7CD197',
      'mrkdwn_in': ["text"],
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