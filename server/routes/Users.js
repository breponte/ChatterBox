/* ___SETUP___ */

const router = require('express').Router();         // retrieves current route
const User = require('../models/UserModel');  // reference User template



/* ___GET_REQUESTS___*/

/**
 * Returns ALL users
 * 
 * Model.find(query) will find all entries with the given query, in which you
 *      can .then() the return value (of type query, not promise) in order to
 *      use the data retrieved
 * 
 * First argument is a route that the frontend will request
 * Second argument is the functionality that occurs upon the frontend's request
 *      request - get information sent FROM frontend TO backend
 *      response - send information FROM backend TO frontend
 */
router.route('/').get( async (request, response) => {
    /* finds all entries in the users collection */
    User.find({})
        .then((users) => response.json(users))    // return data to frontend
        .catch((error) => response.status(400)  // return error to frontend
            .json('Error: ' + error));
});

/**
 * Returns a user by ID
 */
router.route('/:id').get( async (request, response) => {
    /* finds all entries in the collection */
    User.findById(request.params.id)
        .then((user) => response.json(user))    // return data to frontend
        .catch((error) => response.status(400)  // return error to frontend
            .json('Error: ' + error));
});



/* ___POST_REQUESTS___*/

/**
 * Creates a new user
 * 
 * Gets data from frontend (using request), processes it, sends to backend
 *      (using .save()), then finally responding to frontend to conclude
 * 
 * First argument is a route that the frontend will request
 * Second argument is the functionality that occurs upon the frontend's request
 *      request - get information sent FROM frontend TO backend
 *      response - send information FROM backend TO frontend
 */
router.route('/addUser').post( async (request, response) => {
    const user = request.body;                  // information from frontend
    const newUser = new User(user);             // new JSON object of User
                                                //      using given information
    newUser.save()                              // saves to backend
        .then(() => response.json(newUser))     // confirmation to frontend
        .catch((error) => response.status(400)  // return error to frontend
            .json('Error: ' + error));
});

module.exports = router;