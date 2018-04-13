const mongoose = require('mongoose');

var DisturbanceSchema = new mongoose.Schema({
    lat: { type: Number, required: true },
    lon: { type: Number, required: true },
    timestamp: { type: Date, required: true },
    notes: { type: String, required: true },
    status: { type: String, required: true }
});

module.exports = mongoose.model('Disturbance', DisturbanceSchema);
