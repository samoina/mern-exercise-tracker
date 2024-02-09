//import Express.js, body parser to parse incoming request bodies, cors becz FE and BE are located on different domains, then load env variables from an env file

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const mongoose = require('mongoose');

require('dotenv').config();

//create an Express app instance, an object that will define routes, middleware and other functionalities. check if PORT is set, if not, use port 5000
const app = express();
const port = process.env.PORT || 5000;

//add cors to the app, add json middleware to the app so that it parses incoming data and makes it availaleas JS objects
app.use(cors());
app.use(express.json());

//connection between nodejs and mongodb
//retrieve the connection URI from the env variable ATLAS_URI contains teh string specifying the connection details. not stored in code.
const uri = process.env.ATLAS_URI;

//use the retrieved URI to connect to Mongodb using mongoose. the use..are options
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true });

//store this connection in a  variable
const connection = mongoose.connection;

//on the connection object,set an event listener for the open event and run the cb function provided
connection.once('open', () => {
	console.log('MongoDB database connection established');
});

app.listen(port, () => {
	console.log(`Server is running on port: ${port}`);
});
