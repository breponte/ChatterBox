const mongoose = require('mongoose');       // import Mongoose to allow for 
                                            //      communication with mongo.db
const { MessageSchema } = require('./MessageModel');

/* template of entries in the Users collection (schema like schematic) */
const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: false,
        trim: true,
    },
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
        trim: true,
    },
    messages: {
        type: [MessageSchema],
        required: true,
    }
});

const User = mongoose.model('User', UserSchema);
module.exports = User;