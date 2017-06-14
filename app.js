var express = require('express')
var fs = require('fs');

var options = {
    key: fs.readFileSync('/etc/letsencrypt/live/remoteapprentice.io/privkey.pem'),
    cert: fs.readFileSync('/etc/letsencrypt/live/remoteapprentice.io/fullchain.pem')
}

var express = require('express');
var app = express();
var server = require('https').createServer(options, app)
require('dotenv').config();


app.set('port', 443);
app.use(express.static(__dirname + '/public'));

var http = require('http');
http.createServer(function (req, res) {
    res.writeHead(301, { "Location": "https://" + req.headers['host'] + req.url });
    res.end();
}).listen(80);

app.get('/', function(req, res) {
    res.render('index.html');
});

server.listen(app.get('port'), app.get('ipaddr'), function(){
    console.log('Express server listening on  IP: ' + app.get('ipaddr') + ' and port ' + app.get('port'));
});
