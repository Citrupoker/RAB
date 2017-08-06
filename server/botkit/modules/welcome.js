var Member = require('../../models/members');

module.exports = (handles, controller, bot) => {
    controller.on(handles, function (bot, message) {
        console.log('user joined');
        console.log(message);
    });
};
