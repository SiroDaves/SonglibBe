const mongoose = require('mongoose');

const modelSchema = new mongoose.Schema({
    id: { type: Number, unique: true },
    user: { type: Number, required: false },
    line1: { type: String, required: false },
    line2: { type: String, required: false },
    city: { type: String, required: false },
    country: { type: String, required: false },
    coordinates: { type: String, required: false },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date }
});

module.exports = mongoose.model('UserAddress', modelSchema);;