
var membersCtrl = require('../controllers/members');

module.exports = function (app) {

    app.get('/api/v1/members', membersCtrl.getMembers)
    app.post('/api/v1/addMembers', membersCtrl.addMember)
    app.put('/api/v1/updateMember/:id', membersCtrl.updateMember)
    app.delete('/api/v1/deleteMember/:id', membersCtrl.deleteMember)
    app.delete('/api/v1/deleteAllMembers', membersCtrl.deleteAllMembers)
    
}