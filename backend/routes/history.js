const express = require('express');
const router = express.Router();
var Disturbance = require('../models/disturbance');
const keywords = require('../etc/suggestions-keywords');
const helpers = require('../etc/helpers');

let convert_to_days ={
	0 : "SUNDAY",
	1 : "MONDAY",
	2 : "TUESDAY",
	3: "WEDNESDAY",
	4: "THURSDAY",
	5: "FRIDAY",
	6: "SATURDAY"
}

let days ={
	"SUNDAY": 0,
	"MONDAY": 0,
	"TUESDAY": 0,
	"WEDNESDAY": 0,
	"THURSDAY": 0,
	"FRIDAY": 0,
	"SATURDAY": 0
}

let hours = {
}

let location = [];

router.get('/', function(req, res) {
    Disturbance.find({status : "ACTIVE"}).sort({timestamp: -1}).exec(function(err, disturbances) {
    	if(err){
    		res.status(500).send({error: "Could not load disturbances"});
    	}else{
    		disturbances.map(d => {
    			let date = new Date(d.timestamp);
    			let hour = date.getHours();
    			let day = date.getDay();
    			days[convert_to_days[day]]++;

    			if(hours[hour] > 0){
    				hours[hour]++;
    			}else{
    				hours[hour] = 1;
    			}
    			let pos = {'latitude' : d.lat, 'longitude': d.lon};
    			let grouped = false;
				for (var i = 0; i < location.length; i++) { 
    				let pos_group = {'latitude' : location[i].latitude, 'longitude': location[i].longitude};
				    if(helpers.withinRadius(pos_group, pos , 0.5)){
				    	location[i].events++;
				    	grouped = true;
				    }
				}
				if(!grouped){
					let new_loc = {'latitude' : d.lat, 'longitude': d.lon, 'events': 1};
					location.push(new_loc);
				}
    		});

    		res.json({ 'days': days, 'hours': hours, 'locations':location});
    	}
    });
});
 
module.exports = router;

