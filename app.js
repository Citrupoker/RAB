require('dotenv').config();

var path = require('path');
var fs = require('fs');
var express = require('express');
var app = express();

var bodyParser     = require('body-parser');
var hookshot = require('hookshot');

require('./twitter')();
require('./botkit');

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.set('views', path.join(__dirname, 'public'));
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); //for parsing url encoded

app.use('/github-webhook', hookshot('refs/heads/dev', 'git pull && pm2 restart app'));

app.listen(process.env.PORT || 3004, function  () {
    console.log('Express server listening on  IP: 0.0.0.0 and port ' + process.env.PORT);
  });
 
