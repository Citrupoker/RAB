var Botkit = require('botkit');
var winston = require('winston')

module.exports = function () {

if (!process.env.token) {
    console.log('Error: Specify token in environment');
    process.exit(1);
}

var controller = Botkit.slackbot({
    debug: false,
    clientId: process.env.clientId,
    clientSecret: process.env.clientSecret,
    scopes: ['bot','incoming-webhook'],
    send_via_rtm: true,
    require_delivery: true,
});

var bot = controller.spawn({
    token: process.env.token
}).startRTM();

    var logger = new (winston.Logger)({
        transports: [
            new (winston.transports.Console)(),
            new (winston.transports.File)({filename: 'bot.log'})
        ]
    });
    logger.on('logging', function (transport, level, msg, meta) {
        bot.say({
            text: "Hello World!",
            channel: "C5ZDE7NPN"
        });
    });

/*
    Include all chat bot modules here. Order matters.
    Note the "wHIte stripes" bug
*/
addHandler(['help'], "help")
addHandler(['call me (.*)', 'my name is (.*)'], "callme")
addHandler(['wiki (.*)'], "wikipedia")
addHandler(['login (.*)'], "login")
addHandler(['update'], "update")
addHandler(['codepen (.*)'], "codepen")
addHandler(['upwork (.*) (.*)'], 'upwork')
addHandler(['uptime', 'identify yourself', 'who are you', 'what is your name'], "uptime")
addHandler(['hello', 'hi'], "greetings")
addHandler(['dm'], "twitterdm")
addHandler(["profile"], "profile")

function addHandler(handles, name){
     require("./modules/" + name + ".js")(handles, controller, bot)
}

}