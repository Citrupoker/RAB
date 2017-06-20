var Members = require('../models/members')

module.exports.addMember = function(req, res){
    var name = req.body.name;
    var coach = req.body.coach === 'true'
    var email = req.body.email;
    var desc = req.body.desc;
    var skills = req.body.skills.split(',');
    var roles = req.body.roles.split(',');
    var img = req.body.img;
    var website = req.body.website;
    var views = req.body.views;
    var offers = req.body.offers.split(',');
    
    var newMember = new Members();
    newMember.name = name;
    newMember.coach = coach;
    newMember.email = email;
    newMember.desc = desc;
    newMember.skills = skills;
    newMember.roles = roles;
    newMember.img = img;
    newMember.website = website;
    newMember.views = views;
    newMember.offers = offers;
    
    newMember.save(function(err, member) {
        if (err) throw err
        res.json(member)
    })
}