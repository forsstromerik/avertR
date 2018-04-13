const express = require('express');
const router = express.Router();
var Disturbance = require('../models/disturbance');

router.get('/', function(req, res) {
    res.json({
        name: 'disturbance-reporter-api',
        status: 'running'
    });
});
 
module.exports = router;
