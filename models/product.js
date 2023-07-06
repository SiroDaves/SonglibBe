const mongoose = require('mongoose');

const modelSchema = new mongoose.Schema({
    id: { type: Number, default: 0 },
    category: { type: Number, required: true },
    user: { type: Number, default: 0 },
    title: { type: String, required: true },
    description: { type: String, required: false },
    thumb_url: { type: String, required: true },
    file_url: { type: String, required: true },
    music: { type: String, required: false },
    features: { type: String, required: false },
    price: { type: Number, default: 0 },
    discount: { type: Number, default: 0 },
    likes: { type: Number, default: 0 },
    comments: { type: Number, default: 0 },
    views: { type: Number, default: 0 },
    viewable: { type: String, default: 'public' },
    commentable: { type: Boolean, default: true },
    published_at: { type: Date },
    updated_at: { type: Date },
    created_at: { type: Date, default: Date.now },
    meta: {
        file_size: { type: Number, default: 0 },
        file_format: { type: String, default: 'mp4' },
        mime_type: { type: String, default: 'video/mp4' },
        playtime_string: { type: String, default: '0:00' },
        playtime_seconds: { type: Number, default: 0 },
        bitrate: { type: Number, default: 0 },
    }
});

module.exports = mongoose.model('Product', modelSchema);
