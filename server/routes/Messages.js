/* ___SETUP___ */

const router = require('express').Router();     // retrieves current route
const MessageModel = 
    require('../models/MessageModel');         // reference Messages template
const UserModel =                               // reference User template
    require('../models/UserModel');


/* ___GET_REQUESTS___ */

/**
 * Returns ALL messages by given user
 */
router.route('/').get((request, response) => {
    const query = { username: request.body.username };

    /* queries by username, then sends messages under user to frontend */
    UserModel.find(query)
        .then((user) => {
                response.json(user.messages);   // all messages to frontend
            })
        .catch((error) => response.status(400)
            .json('Error: ' + error));
});



/* ___POST_REQUESTS___ */

/**
 * Creates a new message under given user
 */
router.route('/addMessage').post( async (request, response) => {
    const query = { username: request.body.username };
    const newMessage = new MessageModel(request.body);

    /* queries by username, then sends confirmation to frontend */
    UserModel.find(query)
        .then((user) => {
                user.messages.push(newMessage); // add new message
                user.save();                    // save changes
                response.json(newMessage);      // confirmation
            })
        .catch((error) => response.status(400)
            .json('Error: ' + error));
});

module.exports = router;