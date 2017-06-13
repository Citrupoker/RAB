var express = require('express')
var app = express()

app.get('/', function(req, res) {
    res.end('test')
})

app.listen(8080, function() {
    console.log('Server running.')
})