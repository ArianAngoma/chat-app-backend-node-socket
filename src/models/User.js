const {Schema, model} = require('mongoose');

const UserSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    online: {
        type: Boolean,
        default: false
    }
});

UserSchema.methods.toJSON = function () {
    const {__v, password, _id, ...user} = this.toObject();
    user.uid = _id;
    return user;
}
module.exports = model('User', UserSchema);