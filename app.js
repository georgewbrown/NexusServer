require('dotenv').config()

const express = require('express');
const app = express();


const sequelize = require('./db');
const bodyParser = require('body-parser');

const business = require('./controllers/businesscontroller');
const employee = require('./controllers/employeecontroller');
const post = require('./controllers/postcontroller');

sequelize.sync(); //tip: {force:true} for resetting
app.use(bodyParser.json());
app.use(require('./middleware/headers'))

app.use('/business',business)
app.use('/employee',employee)

app.use(require('./middleware/validate-session'))

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
