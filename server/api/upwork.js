var upworkCtrl = require('../controllers');

module.exports = function (app) {

    app.get('/api/v1/upwork/jobs/:search', upworkCtrl.getJobs)

}