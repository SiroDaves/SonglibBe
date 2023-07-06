const mongoose = require('mongoose');

const modelSchema = new mongoose.Schema({
    id: { type: Number, unique: true },
    role: { type: Number, default: 5 },
    username: { type: String, required: true, unique: true},
    email: { type: String, required: true, unique: true},
    firstname: { type: String, required: false },
    lastname: { type: String, required: false },
    password: { type: String, required: true },
    lastlogin: { type: Date, default: Date.now },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date }
});

module.exports= mongoose.model('User', modelSchema);