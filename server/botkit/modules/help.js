var commands = [
  {
    input: 'uptime, identify yourself, who are you, what is your name',
    use: 'displays how long the bot has been running',
  },
  {
    input: 'what is my name, who am i',
    use: 'displays your username',
  },
  {
    input: 'call me <your_name>, my name is <your_name>',
    use: 'tell bot what your nickname is',
  },
  {
    input: 'wiki <your_query>',
    use: 'displays the Wikipedia page for a query',
  },
  {
    input: 'register <your_email>',
    use: 'Can only be used in a Direct Message to the bot. tell bot your email address to begin the registration process',
  },
  {
    input: 'codepen <recent/popular/picks>',
    use: 'Can only be used in a Direct Message to the bot. Returns results from the codepen API',
  },
];

var reply_with_attachments = {
  username: 'remoteapprentice',
  text: 'Help commands',
  mrkdwn: true,
  attachments: [
    {
      fallback: 'To be useful, I need you to invite me in a channel.',
      title: 'Here is a list of commands I currently know:',
      fields: commands.map((command) => [
        {
          title: 'Input:',
          value: command.input,
          short: true,
        },
        {
          title: 'Use:',
          value: command.use,
          short: true,
        },
      ]).reduce((x, y) => x.concat(y)),
      color: '#7CD197',
      mrkdwn_in: ['text'],
    },
  ],
  icon_url: 'http://lorempixel.com/48/48',
};

module.exports = (handles, controller, bot) => {
  controller.hears(handles,
      'direct_message,direct_mention,mention', function (bot, message) {
          bot.reply(message, reply_with_attachments);

        });
};
