const mongoose = require('mongoose');

const tagSchema = new mongoose.Schema({
    tags: [{
        type: new mongoose.Schema({
            title: {
                type: String
            }
        }, {
            timestamps: true
        })
    }],
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }
}, {
    versionKey: false
});

const Tag = mongoose.model('Tag', tagSchema);

module.exports = Tag