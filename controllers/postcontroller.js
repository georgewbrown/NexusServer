require('dotenv').config();

var express = require('express');
var router = express.Router();
var sequelize = require('../db');
const Post = sequelize.import('../models/post')
const validateSession = require('../middleware/validate-session')


// post a new post 
// req.body is the post object
router.post('/create', validateSession, async (req, res,) => {(
    await Post.create({
        businessId: req.business.id,
        name: req.body.name,
        jobTitle: req.body.jobTitle,
        location: req.body.location,
        payRange: req.body.payRange,
        jobDescription: req.body.jobDescription,
        skills: req.body.skills,
    })
    .then(
            createPostSuccess = (post) => {
                res.status(200).json ({
                Post: post,
                message: 'New Post Created!',
            })
        },
            createPostFail = (err) => {
            res.status(500).send(err.message)       
        }
    )
)})

router.get('/all', async (req, res) => {(
    await Post.findAll({include: 'business'})
    .then(
            findAllSuccess = (post) => {
            res.status(200).json({
            post
            })
        },

            findAllError = (err) => {
            res.status(500).send("Could not GET All the Post's!")
            console.log(err)
        }
    )
)})

router.get('/:id', async (req, res) => {(
    await Post.findOne({ where: {id: req.params.id }, include: 'business' })
    .then(post => res.status(200).json(post))
    .catch(err => res.status(500).json(err))
)})


router.post('/update/:id', validateSession, async (req, res) => {(
  await Post.update((req.body),{ where: { id: req.params.id,}})
    .then(
        updateSuccess = (post) => {
            res.status(200).json({
                Post: post,
                message: "Post successfully updated!"
            })
        },

        updateFail = (err) => {
            res.status(500).json({
                message: err.message
            })
        }
    )
)})

router.delete('/delete/:id', validateSession, async (req, res) => {(
  await Post.destroy({ where: { id: req.params.id, } })
    .then(
         deleteSuccess = (post) => {
            res.status(200).json({
                Post: post,
                message: "Post Successfully deleted"
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
