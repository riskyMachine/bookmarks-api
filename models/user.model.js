const mongoose = require('mongoose');
const validator = require('validator');


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Invalid Email')
            }
        }
    },
    tagId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Tag'
    }
}, {
    timestamps: true,
    versionKey: false
});

// userSchema.virtual('tags', {
//     ref: 'Tag',
//     localField: '_id',
//     foreignField: 'user'
// });

const User = mongoose.model('User', userSchema);

module.exports = User