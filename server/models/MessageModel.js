const mongoose = require('mongoose');       // import Mongoose to allow for 
                                            //      communication with mongo.db

/* template of entries in the Messages collection (schema like schematic) */
const MessageSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true,
    },
    content: {
        type: String,
        required: true,
        trim: true,
    },
}, {
    timestamps: true
});

const Message = mongoose.model('Message', MessageSchema);
module.exports = { Message, MessageSchema };