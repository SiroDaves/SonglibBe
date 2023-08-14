const mongoose = require('mongoose');

const modelSchema = new mongoose.Schema({
    bookid: { type: Number, unique: true },
    user: { type: Number, default: 0 },
    icon: { type: String },
    title: { type: String, required: true, unique: true },
    subTitle: { type: String, required: true, unique: true },
    songs: { type: Number, default: 0 },
    position: { type: Number, default: 0 },
    bookNo: { type: Number, default: 0 },
    enabled: { type: Boolean, default: true },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date }
});

module.exports = mongoose.model('Book', modelSchema);