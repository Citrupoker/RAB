var path = require('path');
var fs = require('fs');
var express = require('express');
var app = express();
var mongoose = require('mongoose');
var bodyParser     = require('body-parser');
require('dotenv').config()
var port = process.env.PORT || 5000;

mongoose.connect(process.env.MONGODB);


require('./twitter')();
require('./botkit')();

app.set('port', port);
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.set('views', path.join(__dirname, 'public'));
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); //for parsing url encoded
app.use(express.static(__dirname + '/public'));


require('./api')(app);

app.listen(app.get('port'), function() {
    console.log("Node app is running at localhost:" + app.get('port'))
})

