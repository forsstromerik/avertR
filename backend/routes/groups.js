const express = require('express');
const router = express.Router();
const Group = require('../models/group');
const Disturbance = require('../models/disturbance');


router.get('/suggestions', function(req, res) {
    Disturbance.find({status : "ACTIVE" }).sort({timestamp: -1}).exec(function(err, disturbances) {
        if(err){
            res.status(500).send({error: "Could not load disturbances"});
        }else{
            suggestions = []; 
            disturbances.map((el1) => {
                var group_suggestion = [ el1._id ];

                disturbances.map((el2) => {

                    if(el1._id !== el2._id){
                        let el1_pos = {latitude : el1.lat, longitude : el1.lon};
                        let el2_pos = {latitude : el2.lat, longitude : el2.lon};

                        if(withinRadius(el1_pos, el2_pos, 0.2) && withinTimeFrame(el1.timestamp, el2.timestamp, 1200000) ){
                            group_suggestion.push(el2._id);
                        }
                    }
                });
                if(group_suggestion.length > 1){
                    suggestions.push(group_suggestion);
                }
            });

            res.json(suggestions);
        }
    });

});

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



function withinTimeFrame(time1, time2, msec){
    let d1 = Date.parse(time1);
    let d2 = Date.parse(time2);

    let diff = Math.abs(d1-d2);
    return (diff <= msec);
}

function withinRadius(point1, point2, kms) {
  let R = 6371;
  let deg2rad = (n) => { return Math.tan(n * (Math.PI/180)) };

  let dLat = deg2rad(point2.latitude - point1.latitude );
  let dLon = deg2rad( point2.longitude - point1.longitude );

  let a = Math.sin(dLat/2) * Math.sin(dLat/2) + Math.cos(deg2rad(point1.latitude)) * Math.cos(deg2rad(point2.latitude)) * Math.sin(dLon/2) * Math.sin(dLon/2);
  let c = 2 * Math.asin(Math.sqrt(a));
  let d = R * c;

  return (d <= kms);
}



module.exports = router;
