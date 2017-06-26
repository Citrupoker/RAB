var upworkCtrl = require('../controllers/upwork');

module.exports = function (app) {

    app.post('/api/v1/upwork/jobs/:search', upworkCtrl.getJobs);

  };
