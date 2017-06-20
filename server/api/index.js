
var mainCtrl = require('../controllers')


module.exports = function (app) {
    
    app.post('/api/v1/addMembers', mainCtrl.addMember)
    
    app.get('/api/test', function(req, res) {
        res.end('test success');
    })
    
}