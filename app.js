require('dotenv').config()

const express = require('express');
// instantiate an instance of an express server
const app = express();

const sequelize = require('./db');
const bodyParser = require('body-parser');

const business = require('./controllers/businesscontroller');
const employee = require('./controllers/employeecontroller');
const post = require('./controllers/postcontroller');

const volleyball = require('volleyball');

// Logging and body parsing middleware does not have a path argument
// but just a callback function. If the first argument to an app.use call
// is a callback, it always matches that middleware on every request.

//logging middleware - written by Fullstack's own Gabriel Lebec!
app.use(volleyball);
//body parsing middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(require('./middleware/headers'))


// API routers to serve up data from the server
app.use('/business',business)
app.use('/employee',employee)
app.use('/post',post)

// API routers to serve up data from the server
app.use('*', (req, res, next) => {
    res.send('this is the default route');
  });

// actually start the server
const server = app.listen(process.env.PORT, () => {
  // this is an async callback, so the server.address().port is available
  // and set synchronously by the time we get into this callback function - fancy!
  console.log('Server operating and listening on port', server.address().port, '...');
  // change to force: true whenever you make a change to the db definition
  sequelize.sync() //{force: false} //{force:true}
    .then(message => {
      console.log('...and db is synced!');
    })
    
    .catch(function(err) {
      throw err;
    });
});
