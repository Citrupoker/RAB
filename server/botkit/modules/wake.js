module.exports = (handles, controller, bot) => {
    controller.hears(handles,
        'direct_message,direct_mention,mention', function (bot, message) {

            bot.reply(message,
                ':robot_face: Visit this url to wake me https://remoteapprentice.herokuapp.com')

        });

}