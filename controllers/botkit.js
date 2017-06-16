var Botkit = require('botkit');
var mongoUri = process.env.MONGODB_URI || 'mongodb://localhost/botkit_express_demo';
var botkitMongoStorage = require('../../config/botkitMongoStorage')({ mongoUri: mongoUri });

if (!process.env.clientId || !process.env.clientSecret) {
  console.log('Error: Specify clientId and clientSecret in environment');
  process.exit(1);
}

var controller = Botkit.slackbot({
    storage: botkitMongoStorage,
  });

exports.controller = controller;

exports.connect = function (teamConfig) {
    var bot = controller.spawn(teamConfig);
    controller.trigger('create_bot', [bot, teamConfig]);
  };

var _bots = {};

function trackBot(bot) {
  _bots[bot.config.token] = bot;
}

controller.on('create_bot', function (bot, team) {

    if (_bots[bot.config.token]) {
      // already online! do nothing.
      console.log('already online! do nothing.');
    } else {
      bot.startRTM(function (err) {

          if (!err) {
            trackBot(bot);

            console.log('RTM ok');

            controller.saveTeam(team, function (err, id) {
                if (err) {
                  console.log('Error saving team');
                } else {
                  console.log('Team ' + team.name + ' saved');
                }
              });
          } else {
            console.log('RTM failed');
          }

          bot.startPrivateConversation({ user: team.createdBy }, function (err, convo) {
              if (err) {
                console.log(err);
              } else {
                convo.say('I am a bot that has just joined your team');
                convo.say('You must now /invite me to a channel so that I can be of use!');
              }
            });

        });
    }
  });

controller.on('rtm_open', function (bot) {
    console.log('** The RTM api just connected!');
  });

controller.on('rtm_close', function (bot) {
    console.log('** The RTM api just closed');
  });

controller.hears('hello', 'direct_message', function (bot, message) {
    bot.reply(message, 'Hello!');
  });

controller.hears('^stop', 'direct_message', function (bot, message) {
    bot.reply(message, 'Goodbye');
    bot.rtm.close();
  });

controller.on('direct_message,mention,direct_mention', function (bot, message) {
    bot.api.reactions.add({
        timestamp: message.ts,
        channel: message.channel,
        name: 'robot_face',
      }, function (err) {
        if (err) { console.log(err); }

        bot.reply(message, 'I heard you loud and clear boss.');
      });
  });

controller.storage.teams.all(function (err, teams) {

    console.log(teams);

    if (err) {
      throw new Error(err);
    }

    // connect all teams with bots up to slack!
    for (var t  in teams) {
      if (teams[t].bot) {
        var bot = controller.spawn(teams[t]).startRTM(function (err) {
            if (err) {
              console.log('Error connecting bot to Slack:', err);
            } else {
              trackBot(bot);
            }
          });
      }
    }

  });
