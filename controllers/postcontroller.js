require('dotenv').config();

var express = require('express');
var router = express.Router();
var sequelize = require('../db');
var Post = sequelize.import('../models/post')
var jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const validateSession = require('../middleware/validate-session')


// post a new post 
// req.body is the post object
router.post('/create', (req, res, next) => {
    Post.create(req.body)
    .then(
        function createPostSuccess (post) {
            let token = jwt.sign({ id: post.id }, 'JWT_SECRET',{expiresIn: 60*60*24});
                res.status(200).json ({
                Post: post,
                message: 'New Post Created!',
                sessionToken: token
            })
        },
        function createPostFail(err) {
            res.status(500).send(err.message)       
        }
    )
})


router.post('/signin', (req, res) => {
    Post.findOne({ where: { email: req.body.email } }).then (Post => {
        if (Post) {
            bcrypt.compare(req.body.password, Post.password, (err, matches) => {
                if(Post) {
                    let token = jwt.sign({ id: post.id }, process.env.JWT_SECRET, { expiresIn: 60*60*24 });
                    res.json({
                        post: post,
                        message: 'Successfully authenticated.',
                        sessionToken: token
                    });
                } else {
                    res.status(502).send({ error: 'Passwords do not match.' })
                }
            });
        } else {
            res.status(403).send({ error: 'Post not found.' })
        }
    })
})

router.get('/all', (req, res) => {
    Post.findAll()
    .then(
        function findAllSuccess(Post) {
            res.status(200).json({
                Post
            })
        },

        function findAllError(err) {
            res.status(500).send("Could not All the Post's!")
        }
    )
})

  router.get('/:id', (req, res) => {
    Post.findOne({ where: {id: req.params.id } })
    .then(Post => res.status(200).json(Post))
    .catch(err => res.status(500).json(err))
})

router.put('/update/:id', validateSession,(req, res) => {
    Post.update({
     name: req.body.name,
     password: req.body.password,
     email: req.body.email,
     phoneNumber: req.body.phoneNumber,
     location: req.body.location,
     website: req.body.website,
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
        function updateSuccess(Post) {
            res.status(200).json({
                Post: Post,
                message: "Post successfully updated!"
            })
        },

        function updateFail(err) {
            res.status(500).json({
                message: err.message
            })
        }
    )
})

router.delete('/delete/:id', validateSession,(req, res) => {
    Post.destroy({
        where: {
            id: req.params.id,
            // username: req.params.username
        }
    })
    .then(
        function deleteSuccess(Post) {
            res.status(200).json({
                Post: Post,
                message: "Post Successfully deleted"
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
