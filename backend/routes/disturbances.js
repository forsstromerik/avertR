const express = require('express');
const router = express.Router();
const Disturbance = require('../models/disturbance');

router.get('/', function(req, res) {
    Disturbance.find({}).sort({timestamp: -1}).exec(function(err, disturbances) {
	if (err) {
	    res.status(500).send({error: "Could not load disturbances"});
	} else {
	    res.json(disturbances);
	}
    });
});


router.post('/', function(req, res) {
    let lat = req.body.lat;
    let lon = req.body.lon;

    Disturbance.create({lat: lat, lon: lon}, function(err, disturbance){
	if(err){
	    res.status(500).send({error: "Could not create disturbance" });
	}else{
	    Disturbance.find({}).sort({timestamp: -1}).exec(function(err, disturbances) {
		if (err) {
		    res.status(500).send({error: "Could not load disturbances"});
		} else {
		    req.io.emit('newDisturbance', { disturbances, newDisturbanceID: disturbance._id } );
		    res.json(disturbance);
		}
	    });
	}
    });
});

router.get('/:id', function(req, res) {
    Disturbance.findById(req.params.id, function(err, disturbance){
	if(err){
	    res.status(500).send({error: "Could not find disturbance " });
	}else{
	    res.json(disturbance);
	}
    });
});

router.put('/:id', function(req, res) {
    let notes = req.body.notes;
    let status = req.body.status;
    let id = req.params.id;

    Disturbance.update({ _id: id}, { $set: { notes: notes, status: status }}, function(err, disturbance) {
	if(err){
	    res.status(500).send({error: "Could not update disturbance" });
	}else{
	    Disturbance.find({}).sort({timestamp: -1}).exec(function(err, disturbances) {
		if (err) {
		    res.status(500).send({error: "Could not load disturbances"});
		} else {
		    req.io.emit('updatedDisturbance', { disturbances } );
		    res.json(disturbance);
		}
	    });
	}
    });
});

router.delete('/:id', function(req, res) {
    let id = req.params.id;

    Disturbance.remove({ _id: id}, function(err){
	if(err){
	    res.status(500).send({error: "Could not delete disturbance" });
	}else{
	    res.sendStatus(200);
	}
    });
});

module.exports = router;
