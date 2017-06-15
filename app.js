require('dotenv').config();

var fs = require('fs');
var options = {
    key: fs.readFileSync('/etc/letsencrypt/live/'+ process.env.siteUrl +'/privkey.pem'),
    cert: fs.readFileSync('/etc/letsencrypt/live/'+ process.env.siteUrl +'/fullchain.pem')
}
var express = require('express');
var app = express();
var server = require('https').createServer(options, app)
var hookshot = require('hookshot');

app.set('port', 443);
app.set('ipaddr', process.env.siteUrl);
app.use(express.static(__dirname + '/public'));


var http = require('http');
http.createServer(function (req, res) {
    res.writeHead(301, { "Location": "https://" + req.headers['host'] + req.url });
    res.end();
}).listen(80);

app.get('/', function(req, res) {
    res.render('index.html');
});

app.use('/github-webhook', hookshot('refs/heads/master', 'git pull'));

server.listen(app.get('port'), app.get('ipaddr'), function(){
    console.log('Express server listening on  IP: ' + app.get('ipaddr') + ' and port ' + app.get('port'));
});

//Bot code can be moved to seperate file later

var Botkit = require('botkit');


if (!process.env.token) {
    console.log('Error: Specify token in environment');
    process.exit(1);
}

var controller = Botkit.slackbot({
    debug: true
});

controller.spawn({
    token: process.env.token
}).startRTM(function(err) {
    if (err) {
        throw new Error(err);
    }
});

controller.hears(['hello','hi'],['direct_message','direct_mention','mention'],function(bot,message) {
    bot.reply(message,"Hello.");
});

controller.hears(['attach'],['direct_message','direct_mention'],function(bot,message) {

    var attachments = [];
    var attachment = {
        title: 'This is an attachment',
        color: '#FFCC99',
        fields: [],
    };

    attachment.fields.push({
        label: 'Field',
        value: 'A longish value',
        short: false,
    });

    attachment.fields.push({
        label: 'Field',
        value: 'Value',
        short: true,
    });

    attachment.fields.push({
        label: 'Field',
        value: 'Value',
        short: true,
    });

    attachments.push(attachment);

    bot.reply(message,{
        text: 'See below...',
        attachments: attachments,
    },function(err,resp) {
        console.log(err,resp);
    });
});

controller.hears(['dm me'],['direct_message','direct_mention'],function(bot,message) {
    bot.startConversation(message,function(err,convo) {
        convo.say('Heard ya loud and clear');
    });

    bot.startPrivateConversation(message,function(err,dm) {
        dm.say('Private reply!');
    });

});

