const express = require('express');
const router = express.Router();
const Group = require('../models/group');

router.get('/', function(req, res) {
    Group.find({}).sort({timestamp: -1}).exec(function(err, groups) {
    	if(err){
    		res.status(500).send({error: "Could not load groups"});
    	}else{
    		res.json(groups);
    	}
    });
});


router.post('/', function(req, res) {
	let notes = req.body.notes;
	let disturbances = req.body.disturbances;

	Group.create({notes: notes, disturbances: disturbances}, function(err, group){
		if(err){
			res.status(500).send({error: "Could not create group" });
		}else{
			res.json(group);
		}
	});
});

router.get('/:id', function(req, res) {
    Group.findById(req.params.id, function(err, group){
    	if(err){
    		res.status(500).send({error: "Could not find group " });
    	}else{
    		res.json(group);
    	}
    });
});

router.put('/:id', function(req, res) {
	let notes = req.body.notes;
	let id = req.params.id;

	Group.update({ _id: id}, { $set: { notes: notes }}, function(err, group) {
		if(err){
			res.status(500).send({error: "Could not update group" });
		}else{
			res.json(group);
		}
	});
});

router.delete('/:id', function(req, res) {
    let id = req.params.id;

    Group.remove({ _id: id}, function(err){
    	if(err){
    		res.status(500).send({error: "Could not delete group" });
    	}else{
    		res.sendStatus(200);
    	}
    });
});


module.exports = router;
