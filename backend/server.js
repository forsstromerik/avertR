const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');

// load env variables
require('dotenv').load();

/* DB connection */
const options = {
    keepAlive: 300000, 
    connectTimeoutMS: 30000,
};
mongoose.connect(process.env.DB_URL, options)
    .then(() => {
        // do something on success?
    })
    .catch((error) => {
        console.log('could not connect to db. error: ' + error);
    });

/* Express application setup */
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({ limit: '50mb' }));

/* Enabling CORS */
app.use(cors());

/* Routing */
app.use('/', require('./routes/base'));
app.use('/disturbances', require('./routes/disturbances'));
app.use('/groups', require('./routes/groups'));
app.use('/police/events', require('./routes/police-events'));

/* 404 */
app.use(function(req, res, next) {
    res.status(404).json({ status: 'NOT_FOUND', message: 'ENDPOINT_DOES_NOT_EXIST' });
});

app.listen(3000);

module.exports = app;
