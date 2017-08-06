var Member = require('../../models/members');

module.exports = (handles, controller, bot) => {
    console.log('welcome');
    controller.on(handles, function (bot, message) {
        console.log(message);
    });
};
