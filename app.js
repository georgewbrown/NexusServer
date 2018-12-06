require('dotenv').config()

const express = require('express');
const app = express();

const sequelize = require('./db');
const volleyball = require('volleyball');
const bodyParser = require('body-parser');

const business = require('./controllers/businesscontroller');
const employee = require('./controllers/employeecontroller');
const post = require('./controllers/postcontroller');

sequelize.sync(); //tip: {force:true} for resetting
//logging middleware - written by Fullstack's own Gabriel Lebec!
app.use(volleyball);
app.use(bodyParser.json());
//body parsing middleware
app.use(bodyParser.urlencoded({extended: true}));
app.use(require('./middleware/headers'))

app.use('/business',business)
app.use('/employee',employee)
app.use('/post',post)

// app.use((req, res, next) => {
//     const error = new Error('Not found');
//     error.status(404);
//     next(error);
// })

// app.use((error, req, res, next) => {
//     res.status(error.status || 500);
//     res.json({
//         error: {
//             message: error.message
//         }
//     })
// });

app.listen(process.env.PORT, () => {console.log('⚙️ ⚙️ ⚙️ Spining Gears on port 3000!⚙️ ⚙️ ⚙️')});
