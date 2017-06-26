scraper = require('backpage-scraper')



scraper.getPost(`http://phoenix.backpage.com/ElectronicsForSale/5-blu-ray-movies-hd-1080p-with-original-case/30250827`, (data) => {
    'use strict';

})
module.exports = (handles, controller, bot) => {
    controller.hears(handles, 'direct_message,direct_mention,mention', function (bot, message) {

        console.log(message.match[1], message.match[2])
        if(message.match[1] == 'backpage'){
            var city = encodeURIComponent(message.match[2]);
            scraper.getLinks(`http://${city}.backpage.com/ComputerJobs/`, (links) =>{
                'use strict';
                bot.repy(message, links)
            })
        }
    });
}