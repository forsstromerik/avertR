const express = require('express');
const router = express.Router();
var Disturbance = require('../models/disturbance');

router.get('/', function(req, res) {
    /*res.json({
        name: 'disturbance-reporter-api',
        status: 'running'
    });*/
    var ds = new DisturbanceSchema(lat = 0.8, lon = 0.1);
    res.json(ds)
});
 
module.exports = router;
