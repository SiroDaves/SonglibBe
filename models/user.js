const mongoose = require('mongoose');

const modelSchema = new mongoose.Schema({
    id: { type: Number, default: 0, unique: true },
    name: { type: String },
    username: { type: String, unique: true },
    email: { type: String },
    phone: { type: String },
    bio: { type: String },
    lastseen: { type: Date, default: Date.now },
    created_at: { type: Date },
    updated_at: { type: Date }
});

module.exports = mongoose.model('User', modelSchema);;