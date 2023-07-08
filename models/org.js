const mongoose = require('mongoose');

const modelSchema = new mongoose.Schema({
    id: { type: Number, unique: true },
    org: { type: Number, required: true },
    title: { type: String, required: false },
    bio: { type: String, required: false },
    public: { type: Boolean, default: false },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date }
});

module.exports = mongoose.model('Org', modelSchema);;