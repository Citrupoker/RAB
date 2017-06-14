var express = require('express')
var app = express()

app.get('/', function(req, res) {
    res.end('test')
})

app.listen(process.env.PORT, function() {
    console.log('Server running.')
})