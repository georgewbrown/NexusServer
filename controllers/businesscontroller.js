require('dotenv').config();

var express = require('express');
var router = express.Router();
var sequelize = require('../db');
var Business = sequelize.import('../models/business')
var jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const validateSession = require('../middleware/validate-session')


router.post('/signup', (req, res) => {
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
          var token = jwt.sign({id: business.id}, process.env.JWT_SECRET, {expiresIn: 60*60*24})  /// left off here
              res.json({
                  business: business,
                  message: "User created",
                  sessionToken: token
              })
          },
          createError = err => res.send(500, err)
        
      )
})

router.post('/signin', (req, res) => {
    Business.findOne({ where: { name: req.body.name } }).then (business => {
        if (business) {
            bcrypt.compare(req.body.password, business.password, (err, matches) => {
                if(matches) {
                    let token = jwt.sign({ id: business.id }, process.env.JWT_SECRET, { expiresIn: 60*60*24 });
                    res.json({
                        business: business,
                        message: 'Successfully authenticated.',
                        sessionToken: token
                    });
                } else {
                    res.status(502).send({ error: 'Passwords do not match.' })
                }
            });
        } else {
            res.status(403).send({ error: 'User not found.' })
        }
    })
})

// router.get('/all', (req, res) => {
//     Business.findAll()
//     .then(
//         function findAllSuccess(business) {
//             res.status(200).json({
//                 business
//             })
//         },

//         function findAllError(err) {
//             res.status(500).send("Could not All the Post's!")
//         }
//     )
// })
router.get('/', (req, res, next) => {
    Business.findAll()
      .then(res.send.bind(res))
      .catch(next)
  });

  router.get('/:id', (req, res) => {
    Business.findOne({ where: {id: req.params.id } })
    .then(business => res.status(200).json(business))
    .catch(err => res.status(500).json(err))
})

router.put('/update/:id',(req, res) => {
    Business.update({
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

    },
        {
        where: {
            id: req.params.id,
            // name: req.params.name
        }
    })
    .then(
        function updateSuccess(business) {
            res.status(200).json({
                Business: business,
                message: "Business successfully updated!"
            })
        },

        function updateFail(err) {
            res.status(500).json({
                message: err.message
            })
        }
    )
})

router.delete('/delete/:id',(req, res) => {
    Business.destroy({
        where: {
            id: req.params.id,
            // username: req.params.username
        }
    })
    .then(
        function deleteSuccess(business) {
            res.status(200).json({
                Business: business,
                message: "Business Successfully deleted"
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
