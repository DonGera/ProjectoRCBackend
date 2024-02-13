const mongoose = require('mongoose');
const { Schema } = mongoose;
const UserSchema = new Schema({
    email: { type: String, required: true, unique: true},
    username: { type: String, required: true},
    password: { type: String, required: true},
    role: { type: String, enum: ["admin", "client"], required: true},
});

module.exports = mongoose.model('User', UserSchema);