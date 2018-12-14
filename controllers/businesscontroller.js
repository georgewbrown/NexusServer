require('dotenv').config();

var express = require('express');
var router = express.Router();
var sequelize = require('../db');
const Business = sequelize.import('../models/business')
var jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const validateSession = require('../middleware/validate-session');
const Op = sequelize.Op;


router.post('/signup', (req, res) => {
  let username = req.body.username
  let name = req.body.name
  let password = req.body.password
  let email = req.body.email
  let about = req.body.about
  let profilePicture = req.body.profilePicture
  let phoneNumber = req.body.phoneNumber
  let location = req.body.location
  let website = req.body.website
  let linkdin = req.body.linkdin
  let faceBook = req.body.faceBook
  let instagram = req.body.instagram
  let twitter = req.body.twitter
  let rating = req.body.rating

    Business.create({
          username: username,
          name: name,
          password: bcrypt.hashSync(password, 10), 
          email: email, 
          about: about,
          profilePicture: profilePicture,
          phoneNumber: phoneNumber,           
          location: location,
          website: website,
          linkdin: linkdin,
          faceBook: faceBook,
          instagram: instagram,
          twitter: twitter,
          rating: rating
      })
      .then( 
          signupSuccess = (business) => {
          var token = jwt.sign({id: business.id}, process.env.JWT_SECRET, {expiresIn: 60*60*24}) 
              res.json({
                  business: business,
                  message: "User created",
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
 await Business.findOne({where: {[Op.or]: [{email: email}, {username: username}]}})
        .then(
            (business) => {
                if (business) {
                    bcrypt.compare(password, business.password,  (err, matches)  =>{
                        if (matches) {
                            let token = jwt.sign({ id: business.id }, process.env.JWT_SECRET)
                            res.json({
                                business: business,
                                message: "successfully authenticated",
                                sessionToken: token
                            })
                        } else {
                            res.status(502).send({ error: "failed to find business" })
                        }
                    })
                } else {
                    res.status(500).send({ error: "failed to authenticate business" })
                }
            },
            function (err) {
                res.status(501).send({ err: "something went wrong" })
            }
        )
})

router.get('/all', async (req, res, next) => {
 await Business.findAll({
        include: [{all: true}]
    })
      .then(res.send.bind(res))
      .catch(next)
  });

  router.get('/:id', validateSession, async (req, res) => {(
    await Business.findOne({ where: {id: req.params.id }, include: [{all: true}] })
    .then(business => res.status(200).json(business))
    .catch(err => res.status(500).json(err))
)})

router.put('/update/:id', validateSession, async (req, res) => {
await Business.update({
   username: req.body.username,
   name: req.body.name,
   password: req.body.password,
   email: req.body.email,
   about: req.body.about,
   profilePicture: req.body.profilePicture,
   phoneNumber: req.body.phoneNumber,
   location: req.body.location,
   website: req.body.website,
   faceBook: req.body.faceBook,
   instagram: req.body.instagram,
   twitter: req.body.twitter,
   rating: req.body.rating,

    },{
        where: {
            id: req.params.id,
            // name: req.params.name
        }
    })
    .then(
        updateSuccess = (business) => {
            res.status(200).json({
                Business: business,
                message: "Business successfully updated!"
            })
        },

        updateFail = (err) => {
            res.status(500).json({
                message: err.message
            })
        }
    )
})

router.delete('/delete/:id', validateSession, async (req, res) => {(
    await Business.destroy({ where: { id: req.params.id, } })
    .then(
         deleteSuccess = (business) => {
            res.status(200).json({
                Business: business,
                message: "Business Successfully deleted"
            })
        },

         deleteFail = (err) => {
            res.status(500).json({
                error: err.message
            })
        }
    )
)})




module.exports = router;
