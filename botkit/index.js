var Botkit = require('botkit');
var os = require('os');

if (!process.env.token) {
    console.log('Error: Specify token in environment');
    process.exit(1);
}

var controller = Botkit.slackbot({
    debug: false,
});

var bot = controller.spawn({
    token: process.env.token
}).startRTM();

var reply_with_attachments = {
  'username': 'remoteapprentice' ,
  'text': 'Help commands',
  "mrkdwn": true,
  'attachments': [
    {
      'fallback': 'To be useful, I need you to invite me in a channel.',
      'title': 'Here is a list of commands I currently know',
      'text': '*uptime, identify yourself, who are you,' 
        + 'what is your name* - displays how long the bot has been running \n\n' +
        '*what is my name, who am i* - displays your username \n\n' +
        '*call me <your_name>, my name is <your_name>* - tell bot what your nickname is\n\n',
      'color': '#7CD197',
      'mrkdwn_in': ["text"],
    }
  ],
  'icon_url': 'http://lorempixel.com/48/48'
}

/*
    Include all chat bot modules here. Order matters.
    Note the "wHIte stripes" bug
*/
addHandler(['help'], "help")
addHandler(['call me (.*)', 'my name is (.*)'], "callme")
addHandler(['wiki (.*)'], "wikipedia")
addHandler(['login'], "login")
addHandler(['register'], "register")
addHandler(['uptime', 'identify yourself', 'who are you', 'what is your name'], "uptime")
addHandler(['hello', 'hi'], "greetings")
addHandler(['dm'], "twitterdm")

function addHandler(handles, name){
    require("./modules/" + name + ".js")(handles, controller, bot)
}
