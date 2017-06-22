
var mainCtrl = require('../controllers')


module.exports = function (app) {

    app.get('/api/v1/members', mainCtrl.getMembers)
    app.post('/api/v1/addMembers', mainCtrl.addMember)
    app.put('/api/v1/updateMember/:id', mainCtrl.updateMember)
    app.delete('/api/v1/deleteMember/:id', mainCtrl.deleteMember)
    app.delete('/api/v1/deleteAllMembers', mainCtrl.deleteAllMembers)
    
}