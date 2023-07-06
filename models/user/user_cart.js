const mongoose = require('mongoose');

const modelSchema = new mongoose.Schema({
    id: { type: Number, unique: true },
    user: { type: Number, required: false },
    product: { type: Number, required: false },
    quantity: { type: Number, required: false },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date }
});

module.exports = mongoose.model('UserCart', modelSchema);;