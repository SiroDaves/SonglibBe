const mongoose = require('mongoose');

const modelSchema = new mongoose.Schema({
    id: { type: Number, unique: true },
    user: { type: Number, required: true },
    phone: { type: String, required: false },
    bio: { type: String, required: false },
    address: { type: String, required: false },
    dobirth: { type: String, required: false },
    lastseen: { type: Date, default: Date.now },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date }
});

module.exports = mongoose.model('UserProfile', modelSchema);;