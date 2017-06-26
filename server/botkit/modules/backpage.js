scraper = require('backpage-scraper')



scraper.getPost(`http://phoenix.backpage.com/ElectronicsForSale/5-blu-ray-movies-hd-1080p-with-original-case/30250827`, (data) => {
    'use strict';

})
module.exports = (handles, controller, bot) => {
    controller.hears(handles, 'direct_message,direct_mention,mention', function (bot, message) {

        console.log(message.match[1], message.match[2])

            var city = encodeURIComponent(message.match[1]);
            var category = encodeURIComponent(message.match[2]);
            scraper.getLinks(`http://${city}.backpage.com/${category}`, (links) =>{
                'use strict';
                console.log(links);
                bot.reply(message, links[0]);
                

                })

            })

    });
}