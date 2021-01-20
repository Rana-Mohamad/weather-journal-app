// Setup empty JS object to act as endpoint for all routes
projectData = {};
// Express to run server and routes
const express = require('express');
// Start up an instance of app
const app = express();
/* Dependencies */
const bodyParser = require('body-parser');
/* Middleware*/
app.use(bodyParser.urlencoded({ extended: false }));
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.json());
// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());
// Initialize the main project folder
app.use(express.static('website'));
// Spin up the server
const port = 8000;
const server = app.listen(port, listening);
// Callback to debug
function listening(){
  console.log("server running");
  console.log(`running on local host: ${port}`);
};
// Initialize all route with a callback function
app.get('/all', sendData);
// Callback function to complete GET '/all'
function sendData(req, res){
  res.send(projectData);
};

// Post Route
app.post('/add', function(req, res){
  newEntry = {
    temp: req.body.temp,
    date: req.body.date,
    response: req.body.response
  };
  projectData = newEntry;
  console.log(projectData);
  res.send(projectData)
});
