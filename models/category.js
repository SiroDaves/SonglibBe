const mongoose = require('mongoose');

const modelSchema = new mongoose.Schema({
    id: { type: Number, unique: true },
    user: { type: Number, default: 0 },
    parent: { type: Number, default: 0 },
    icon: { type: String },
    title: { type: String, required: true, unique: true },
    description: { type: String },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date }
});

module.exports = mongoose.model('Category', modelSchema);