const mongoose = require('mongoose');

const walletSchema = new mongoose.Schema({
    id: { type: Number, unique: true },
    user: { type: Number, required: true },
    title: { type: String, required: false },
    amount: { type: Number, default: 0 },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date }
});

module.exports = mongoose.model('UserWallet', walletSchema);