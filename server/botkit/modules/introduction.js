module.exports = (handles, controller, bot) => {
    controller.hears(handles, 'ambient,direct_mention,mention,direct_message', function (bot, message) {
        console.log(message);
    });
};
