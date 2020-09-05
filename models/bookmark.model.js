const mongoose = require('mongoose');

const bookmarkSchema = new mongoose.Schema({
    link: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    title: {
        type: String,
        required: true,
        trim: true
    },
    publisher: {
        type: String,
        require: true,
        trim: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    tags: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Tag'
    }]
}, {
    timestamps: true,
    versionKey: false
});

const Bookmark = mongoose.model('Bookmark', bookmarkSchema);

module.exports = Bookmark