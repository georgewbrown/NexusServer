require('dotenv').config();

var express = require('express');
var router = express.Router();
var sequelize = require('../db');
var Employee = sequelize.import('../models/employee')
var jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const validateSession = require('../middleware/validate-session')


router.post('/signup', (req, res) => {
  let name = req.body.name
  let password = req.body.password
  let email = req.body.email
  let phoneNumber = req.body.phoneNumber
  let location = req.body.location
  let linkdin = req.body.linkdin
  let skills = req.body.skills
  let about = req.body.about
  let rating = req.body.rating
  Employee.create({
          name: name,
          password: bcrypt.hashSync(password, 10), 
          email: email, 
          phoneNumber: phoneNumber,           
          location: location,
          linkdin: linkdin,
          skills: skills,
          about: about,
          rating: rating
      })
      .then( 
          signupSuccess = (employee) => {
          var token = jwt.sign({id: employee.id}, process.env.JWT_SECRET, {expiresIn: 60*60*24})  /// left off here
              res.json({
                  employee: employee,
                  message: "User created",
                  sessionToken: token
              })
          },
          createError = err => res.send(500, err)
        
      )
})

router.post('/signin', (req, res) => {
    let username = req.body.name,
        password = req.body.password,
        email = req.body.email;
    let conditions = !!username ? { name: username } : { email: email };
    console.log(conditions)
    Employee.findOne(conditions, (err, Employee) => {
        if (err) return done(err);
        if (!Employee) return done(new Error('Incorrect username or email'));

        return Employee.comparePassword(password, Employee.password)
            .then(match => {
                if (match) return done();
                else return done(new Error('Incorrect password'));
            })
            .catch(error => {
                if (error) return done(new Error(`Unable to validated password. - ${error}`));
            });
    });
})

router.get('/all', (req, res) => {
    Employee.findAll()
    .then(
        function findAllSuccess(employee) {
            res.status(200).json({
                employee
            })
        },

        function findAllError(err) {
            res.status(500).send("Could not All the Post's!")
        }
    )
})

  router.get('/:id', (req, res) => {
    Employee.findOne({ where: {id: req.params.id } })
    .then(employee => res.status(200).json(employee))
    .catch(err => res.status(500).json(err))
})

router.put('/update/:id', validateSession,(req, res) => {
    Employee.update({
     name: req.body.name,
     password: req.body.password,
     email: req.body.email,
     phoneNumber: req.body.phoneNumber,
     location: req.body.location,
     linkdin: req.body.linkdin,
     skills: req.body.skills,
     about: req.body.about,
     rating: req.body.rating
    },
        {
        where: {
            id: req.params.id,
            // name: req.params.name
        }
    })
    .then(
        function updateSuccess(employee) {
            res.status(200).json({
                Employee: employee,
                message: "Employee successfully updated!"
            })
        },

        function updateFail(err) {
            res.status(500).json({
                message: err.message
            })
        }
    )
})

router.delete('/delete/:id', (req, res) => {
    Employee.destroy({
        where: {
            id: req.params.id,
            // username: req.params.username
        }
    })
    .then(
        function deleteSuccess(employee) {
            res.status(200).json({
                Employee: employee,
                message: "Employee Successfully deleted"
            })
        },

        function deleteFail(err) {
            res.status(500).json({
                error: err.message
            })
        }
    )
})




module.exports = router;
