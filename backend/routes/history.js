const express = require('express');
const router = express.Router();
var Disturbance = require('../models/disturbance');
const keywords = require('../etc/suggestions-keywords');
const helpers = require('../etc/helpers');

let convert_to_days ={
    0 : "Sunday",
    1 : "Monday",
    2 : "Tuesday",
    3: "Wednesday",
    4: "Thursday",
    5: "Friday",
    6: "Saturday"
}

let convert_to_interval = {
	0: '00-03',
	3: '03-06',
	6: '06-09',
	9: '09-12',
	12: '12-15',
	15: '15-18',
	18: '18-21',
	21: '21-00',
}
router.get('/', function(req, res) {
    Disturbance.find({status : "ACTIVE"}).sort({timestamp: -1}).exec(function(err, disturbances) {
	if(err){
	    res.status(500).send({error: "Could not load disturbances"});
	}else{
	    let days ={
		"Monday": 0,
		"Tuesday": 0,
		"Wednesday": 0,
		"Thursday": 0,
		"Friday": 0,
		"Saturday": 0,
		"Sunday": 0
	    }

	    let hours = {
	    	'00-03' : 0,
	    	'03-06' : 0,
	    	'06-09' : 0,
	    	'09-12' : 0,
	    	'12-15' : 0,
	    	'15-18' : 0,
	    	'18-21' : 0,
	    	'21-00' : 0,
	    }

	    let location = [];

	    disturbances.map(d => {
		let date = new Date(d.timestamp);
		let hour = date.getHours();
		let day = date.getDay();
		days[convert_to_days[day]]++;

		let interval = hour - hour % 3;

		hours[convert_to_interval[interval]]++;

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

