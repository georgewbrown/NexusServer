require('dotenv').config();

var express = require('express');
var router = express.Router();
var sequelize = require('../db');
var Employee = sequelize.import('../models/employee')
var jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const validateSession = require('../middleware/validate-session');
const Op = sequelize.Op

router.post('/signup', async (req, res) => {
  let username = req.body.username
  let name = req.body.name
  let password = req.body.password
  let email = req.body.email
  let phoneNumber = req.body.phoneNumber
  let location = req.body.location
  let linkdin = req.body.linkdin
  let faceBook= req.body.faceBook
  let instagram= req.body.instagram
  let twitter= req.body.twitter
  let skills = req.body.skills
  let about = req.body.about
  let rating = req.body.rating
  let role= req.body.role
  await Employee.create({
          username: username,
          name: name,
          password: bcrypt.hashSync(password, 10), 
          email: email, 
          phoneNumber: phoneNumber,           
          location: location,
          linkdin: linkdin,
          faceBook: faceBook,
          instagram: instagram,
          twitter: twitter,
          skills: skills,
          about: about,
          rating: rating,
          role: role
      })
      .then( 
          signupSuccess = (employee) => {
          var token = jwt.sign({id: employee.id}, process.env.JWT_SECRET, {expiresIn: 60*60*24}) 
              res.json({
                  employee: employee,
                  message: "employee created",
                  sessionToken: token
              })
          },
          createError = err => res.send(500, err)
        
      )
})

router.post('/signin', async (req, res) => {
    let username = req.body.username
    let password = req.body.password
    let email = req.body.email
    console.log(username, email, password)
    await Employee.findOne({where: {[Op.or]: [{email: email}, {username: username}]}})
    .then((employee) => {
                if (employee) {
                    console.log("employee")
                    bcrypt.compare(password, employee.password, (err, matches) => {
                        if (matches) {
                            let token = jwt.sign({ id: employee.id }, process.env.JWT_SECRET)
                            res.json({
                                employee: employee,
                                message: "successfully authenticated employee",
                                sessionToken: token
                            });
                        } else {
                            res.status(502).send({ error: "failed to find employee" })
                        }
                    })
                } else {
                    res.status(500).send({ error: "failed to authenticate employee" })
                }
            },
            function (err) {
                res.status(501).send({ err: "something went wrong" })
            }
        )
})

router.get('/all', async (req, res) => {
    await Employee.findAll()
    .then(
         findAllSuccess = (employee) => {
            res.status(200).json({
                employee
            })
        },

         findAllError = (err) => {
            res.status(500).send("Could not All the Post's!")
        }
    )
})

  router.get('/:id',validateSession, async (req, res) => {
    await Employee.findOne({ where: {id: req.params.id } })
    .then(employee => res.status(200).json(employee))
    .catch(err => res.status(500).json(err))
})

router.put('/update/:id', validateSession, async (req, res) => {(
    await Employee.update((req.body),{ where: { id: req.params.id,}})
      .then(
          updateSuccess = (post) => {
              res.status(200).json({
                  Post: post,
                  message: "Employee successfully updated!"
              })
          },
  
          updateFail = (err) => {
              res.status(500).json({
                  message: err.message
              })
          }
      )
  )})
  
router.delete('/delete/:id', validateSession,(req, res) => {
    Employee.destroy({
        where: {
            id: req.params.id,
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
