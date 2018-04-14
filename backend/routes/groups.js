const express = require('express');
const router = express.Router();
const Group = require('../models/group');
const Disturbance = require('../models/disturbance');
const keywords = require('../etc/suggestions-keywords');
const helpers = require('../etc/helpers');

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

                        if(helpers.withinRadius(el1_pos, el2_pos, 0.2) && withinTimeFrame(el1.timestamp, el2.timestamp, 1200000) && withinCorrelation(el1.notes, el2.notes, 0.4) ){
                            group_suggestion.push(el2._id);
                        }
                    }
                });

                if(group_suggestion.length > 1){
                    let match = false;
                    suggestions.map(el => {
                      if(el.sort().join(',')=== group_suggestion.sort().join(',')){
                        match = true;
                      }
                    });

                  if (!match) {
                        suggestions.push(group_suggestion);
                  }
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


function withinCorrelation(notes1, notes2, correlation_limit){
    let s1 = notes1.toLowerCase().split(" ");
    let s2 = notes2.toLowerCase().split(" ");
    let groups = [];
    let matches = 0;

    s1.map((word) =>{
      if(keywords[word] > 0){
            groups.push(keywords[word]);
        }
    });

    s2.map((word) =>{
        if(keywords[word] > 0 && groups.indexOf(keywords[word]) !== -1){
                matches++;
        }
    });

    let correlation = matches / 4;
    return(correlation > correlation_limit);
}
function withinTimeFrame(time1, time2, msec){
        let d1 = Date.parse(time1);
        let d2 = Date.parse(time2);
        let diff = Math.abs(d1-d2);
        return (diff <= msec);
}


module.exports = router;
