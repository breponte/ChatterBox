const express = require('express');             // import Express library
const app = express();                          // reference Express library
const mongoose = require('mongoose')            // import Mongoose to allow for 
                                                //      communication with mongo
const cors = require('cors');                   // allows connection to React.js
const UserModel = require('./models/Users');    // reference User template


app.use(express.json());                // parses JSON to object

mongoose.connect(
    'mongodb+srv://bkekoa:Pokemon2303!@cloyster.cuolors.mongodb.net/ChatterBox?retryWrites=true&w=majority'
);

/**
 * Manually run in command line with `node index.js`
 * Nodemon allows the server to reboot whenever there are changes in
 *      the file through `"start": "nodemon index.js"` script in package.json
 * Use `npm start` to get the server running useing Nodemon    
 * 
 * First argument is the port number of the running application (3001 is
 *      React's local host)
 * Second argument is a callback function that runs on bootup
 */
app.listen(3001, () => {
    console.log('SERVER IS RUNNING!');
    console.log('HOORAY');
});

/**
 * Model.find(query) will find all entries with the given query, in which you
 *      can .then() the return value (of type query, not promise) in order to
 *      use the data retrieved
 * 
 * First argument is a route that the frontend will request
 * Second argument is the functionality that occurs upon the frontend's request
 *      request - get information sent FROM frontend TO backend
 *      response - send information FROM backend TO frontend
 */
app.get('/getUsers', async (request, response) => {
    /* finds all entries in the collection */
    UserModel.find({}).then((data) => {
        /* console log the data and return the response to the frontend */
        try {
            console.log(data);
            response.json(data);
        } catch (error) {
            console.error('Error occurred with getUsers: ' + error);
            response.json(error);
        }
    });
});

/**
 * Gets data from frontend (using request), processes it, sends to backend
 *      (using .save()), then finally responding to frontend to conclude
 * 
 * First argument is a route that the frontend will request
 * Second argument is the functionality that occurs upon the frontend's request
 *      request - get information sent FROM frontend TO backend
 *      response - send information FROM backend TO frontend
 */
app.post('/createUser', async (request, response) => {
    const user = request.body;              // information from frontend
    const newUser = new UserModel(user);    // new JSON object of UserModel
                                            //      using given information
    await newUser.save();                   // saves to backend

    response.json(user);                    // confirms to frontend
});