var mongoose = require('mongoose');
var Members = require('../../models/members')

module.exports = (handles, controller, bot) => {
    controller.hears(handles,
        'direct_message', function(bot, message) {
            var email = message.match[1];
            Members.schema.path('email').validate(function (value, res) {
                Members.findOne({email: email}, 'id', function(err, user) {
                    if (err) {
                        return res(err);
                    }
                    if (user) {
                        console.log('user line 14', user);
                        return res(false);
                    }
                    console.log('user line 17', user);
                    res(true);
                });
            }, 'already exists');
            //check email against db emails

            //if email is not already registered
            //add new user with email address
            // trigger start of conversation
            // Thank you. We need some information about you blah blah....

            //What is your name?
            //Write a brief description about yourself.
            //What are your skills?
            //Img url?
            //personal website

            //end conversation.
    });

}