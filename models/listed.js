const mongoose = require('mongoose');

const modelSchema = new mongoose.Schema({
    listedid: { type: Number, unique: true },
    song: { type: Number, required: true },
    title: { type: String, required: false },
    description: { type: String, required: false },
    position: { type: Number, default: 0 },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date }
});

module.exports = mongoose.model('Listed', modelSchema);;