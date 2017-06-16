require('dotenv').config();
require('./controllers/botkit');
var path = require('path');
var fs = require('fs');
var options = {
    key: fs.readFileSync('/etc/letsencrypt/live/' + process.env.siteUrl + '/privkey.pem'),
    cert: fs.readFileSync('/etc/letsencrypt/live/' + process.env.siteUrl + '/fullchain.pem'),
  };
var express = require('express');
var app = express();
require('./routes/routes')(app);
var bodyParser     = require('body-parser');
var server = require('https').createServer(options, app);
var hookshot = require('hookshot');

app.set('port', 443);
app.set('ipaddr', process.env.siteUrl);
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.set('views', path.join(__dirname, 'public'));
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); //for parsing url encoded

var http = require('http');
http.createServer(function (req, res) {
    res.writeHead(301, { Location: `https://${req.headers.host}req.url` });
    res.end();
  }).listen(80);

app.use('/github-webhook', hookshot('refs/heads/dev', 'git pull && pm2 restart app'));

server.listen(app.get('port'), app.get('ipaddr'), function  () {
    console.log('Express server listening on  IP: ' + app.get('ipaddr')
        + ' and port ' + app.get('port'));
  });
