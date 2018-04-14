const express = require('express');
const router = express.Router();
const util = require('util');
const helpers = require('../etc/helpers');

const data = require('../etc/police-events.json');
const POLICE_EVENTS_API_URL = 'https://polisen.se/H4S-2018-handelser.json';

router.get('/', function(req, res) {
    const { lat, lon } = req.query;
    let radius;
    req.query.radius ? radius = req.query.radius : radius = 10;

    let events = [];
    data.map(evt => {
        const mapCenter = { latitude: lat, longitude: lon };
        const parts = evt.location.gps.split(',');
        const evtPos = { latitude: parseFloat(parts[0]), longitude: parseFloat(parts[1]) };

        if (helpers.withinRadius(mapCenter, evtPos, radius)) {
            let event = Object.assign({}, evt);
            delete event['location'];
            event.lat = evtPos.latitude;
            event.lon = evtPos.longitude;
            events.push(event);
        }
    });

    res.json(events);
});

module.exports = router;
