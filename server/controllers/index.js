var Members = require('../models/members')
var ObjectId = require('mongodb').ObjectId; 

module.exports.addMember = (req, res) => {
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

    newMember.save(function (err, member) {
        if (err) throw err
        res.json(member)
    })
}

module.exports.getMembers = (req, res) => {
    console.log(req.body)
    Members.find((err, members) => {
        if (err) {
            return res.status(500).send(err)
        }
        res.json(members);

    });
}

module.exports.updateMember = (req, res) => {
    var id = req.params.id;       
    var o_id = new ObjectId(id);
    Members.findOne({ _id: o_id }, (err, member) => {
        if (err) {
            return res.status(500).send(err);
        }
        console.log(req.params.id);
        member.name = req.body.name || member.name;
        member.coach = req.body.coach || member.coach;
        member.email = req.body.email || member.email;
        member.desc = req.body.desc || member.desc;
        member.skills = req.body.skills || member.skills;
        member.roles = req.body.roles || member.roles;
        member.img = req.body.img || member.img;
        member.website = req.body.website || member.website;
        member.views = req.body.views || member.views;
        member.offers = req.body.offers || member.offers;

        member.save((err, member) => {
            if (err) {
                return res.status(500).send(err)
            }
            res.json(member);
        });

    });
}

module.exports.deleteMember = (req, res) => {
    Members.findByIdAndRemove(req.params.id, (err, member) => {
        res.send({
            message: "Member successfully deleted",
            id: member._id
        });
    });
}