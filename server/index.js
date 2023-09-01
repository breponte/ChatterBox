/**
 * This file is the core of the backend, setting up necessary dependencies
 * and connecting the necessary modules to implement the CRUD functionality
 */

/* ___SETUP___ */

const express = require('express');             // import Express library
const app = express();                          // reference Express library
const mongoose = require('mongoose')            // import Mongoose to allow for 
                                                //      communication with mongo
const cors = require('cors');                   // allows connection to React.js
const port = process.env.PORT || 3001           // port to our server

app.use(cors());                                // allows connection to React.js
app.use(express.json());                        // parses JSON to object

mongoose.connect(
    'mongodb+srv://bkekoa:Pokemon2303!@cloyster.cuolors.mongodb.net/ChatterBox?retryWrites=true&w=majority'
);

/* ___FUNCTIONALITY___ */

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
app.listen(port, () => {
    console.log(`SERVER IS RUNNING AT: ${port}`);
});

/* ___ROUTERS___ */

/* imports */
const usersRouter = require('./routes/Users');
const messagesRouter = require('./routes/Messages');

/* uses the imports */
app.use('/users', usersRouter);
app.use('/messages', messagesRouter);