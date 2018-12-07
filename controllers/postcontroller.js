require('dotenv').config();

var express = require('express');
var router = express.Router();
var sequelize = require('../db');
var Post =  sequelize.import('../models/post')
const validateSession = require('../middleware/validate-session')


// post a new post 
// req.body is the post object
router.post('/create', validateSession, (req, res, next) => {
    Post.create(req.body)
    .then(
        function createPostSuccess (post) {
                res.status(200).json ({
                Post: post,
                message: 'New Post Created!',
            })
        },
        function createPostFail(err) {
            res.status(500).send(err.message)       
        }
    )
})

router.get('/all', (req, res) => {
    Post.findAll()
    .then(
        function findAllSuccess(post) {
            res.status(200).json({
            post
            })
        },

        function findAllError(err) {
            res.status(500).send("Could not GET All the Post's!")
            console.log(err)
        }
    )
})

router.get('/:id', (req, res) => {
    Post.findOne({ where: {id: req.params.id } })
    .then(post => res.status(200).json(post))
    .catch(err => res.status(500).json(err))
})


router.put('/update/:id',(req, res) => {
   Post.update({
   jobTitle: req.body.jobTitle,
   location: req.body.location,
   payRange: req.body.payRange,
   skills: req.body.skills,
   jobDescription: req.body.jobDescription
    },
        {
        where: {
            id: req.params.id,
        }
    })
    .then(
        function updateSuccess(post) {
            res.status(200).json({
                Post: post,
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
        }
    })
    .then(
        function deleteSuccess(post) {
            res.status(200).json({
                Post: post,
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
