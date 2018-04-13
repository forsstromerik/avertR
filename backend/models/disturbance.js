const mongoose = require('mongoose');

var DisturbanceSchema = new mongoose.Schema({
    lat: { type: Number, required: true },
    lon: { type: Number, required: true },
    timestamp: { type: Date, default: Date.now },
    notes: { type: String },
    status: { type: String, default: "PENDING" }
});

module.exports = mongoose.model('Disturbance', DisturbanceSchema);
