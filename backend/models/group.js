const mongoose = require('mongoose');

var GroupSchema = new mongoose.Schema({
    timestamp: { type: Date, default: Date.now },
    disturbances: [{ type: mongoose.Schema.ObjectId, ref: 'Disturbance' }],
});

module.exports = mongoose.model('Group', GroupSchema);
