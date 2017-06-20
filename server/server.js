var path = require('path');
var fs = require('fs');
var express = require('express');
var app = express();

var bodyParser     = require('body-parser');
var port = process.env.PORT || 5000;
var MongoClient = require('mongodb').MongoClient

MongoClient.connect(`mongodb://${process.env.USERNAME}:${process.env.PASSWORD}@ds131312.mlab.com:31312/remoteapprentice`);

app.set('port', port);
require('./twitter')();
require('./botkit')();

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.set('views', path.join(__dirname, 'public'));
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); //for parsing url encoded
require('./api')(app);

app.listen(app.get('port'), function() {
    console.log("Node app is running at localhost:" + app.get('port'))
})

