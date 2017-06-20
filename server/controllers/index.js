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

module.exports.getMembers = function(req, res){
    Members.find(function (err, members) {
        if (err) {
            res.status(500).send(err)
        } else {
            res.json(members);
        }
    });
}

module.exports.updateMember = function(req, res){
    Members.findById(req.params.id, function (err, member) {
        if (err) {
            res.send(err)
        }
        if (member) {
            res.json(member)
        } else {
            res.send("No member found with that ID")
        }
    });
}

module.exports.deleteMember = function(req, res){
    Members.findByIdAndRemove(req.params.id, function (err, member) {
        var response = {
            message: "Member successfully deleted",
            id: member._id
        };
        res.send(response);
    });
}