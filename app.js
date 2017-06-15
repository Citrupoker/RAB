var fs = require('fs');
var options = {
    key: fs.readFileSync('/etc/letsencrypt/live/'+ process.env.siteUrl +'/privkey.pem'),
    cert: fs.readFileSync('/etc/letsencrypt/live/'+ process.env.siteUrl +'/fullchain.pem')
}
var express = require('express');
var app = express();
var server = require('https').createServer(options, app)

require('dotenv').config();


app.set('port', 443);
app.set('ipaddr', process.env.siteUrl);
app.use(express.static(__dirname + '/public'));


var githubMiddleware = require('github-webhook-middleware')({
    secret: process.env.githubSecret,
    limit: '1mb', // <-- optionally include the webhook json payload size limit, useful if you have large merge commits.  Default is '100kb'
});


var http = require('http');
http.createServer(function (req, res) {
    res.writeHead(301, { "Location": "https://" + req.headers['host'] + req.url });
    res.end();
}).listen(80);

app.get('/', function(req, res) {
    res.render('index.html');
});

app.post('/github-webhook/', githubMiddleware, function(req, res) {
    // Only respond to github push events
    if (req.headers['x-github-event'] != 'push') return res.status(200).end();

    var payload = req.body
        , repo    = payload.repository.full_name
        , branch  = payload.ref.split('/').pop();

    var textFiles = getChangedFiles(payload.commits, /.*\.txt$/);
    console.log(payload, repo, branch, textFiles);
});
function getChangedFiles(commits, matchRegex) {
    return commits
        .reduce(function(previousCommit, currentCommit) {
            return previousCommit
                .concat(currentCommit.modified)
                .concat(currentCommit.added)
                .filter(function(value) {
                    return currentCommit.removed.indexOf(value) === -1;
                });
        }, [])
        .filter(function(value, i, arr) {
            return arr.indexOf(value) >= i && matchRegex.test(value);
        });
}
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
        convo.say('Heard ya');
    });

    bot.startPrivateConversation(message,function(err,dm) {
        dm.say('Private reply!');
    });

});

