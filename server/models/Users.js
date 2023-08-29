const mongoose = require('mongoose');       // import Mongoose to allow for 
                                            //      communication with mongo.db

/* template of entries in the Users collection (schema like schematic) */
const UserSchema = new mongoose.Schema({
    // CHECK DOCUMENTATION!!!
    name: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    // messages: {
    //     type: Array,
    //     required: true,
    // }
});

const UserModel = mongoose.model('Users', UserSchema);
module.exports = UserModel;