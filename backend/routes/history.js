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
    		});
    		res.json({ 'days': days, 'hours': hours});
    	}
    });
});
 
module.exports = router;

