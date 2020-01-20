const express=require('express');
const router = express.Router();
const Posts = require('../models/posts-model');

//create post using the information sent inside the request body
router.post('/', (req, res) => {

    (!req.body.title || !req.body.contents) ? (res.status(400).json({ errorMessage: "Please provide title and contents for the post." }))
        :
        Posts.insert(req.body)
            .then(post => {
                post ?
                    res.status(201).json(post):
                    res.status(401).json({errorMessage:"A post with that ID was not found in the database"})
            })
            .catch(error => {
                console.log(error);
                res.status(500).json({ errorMessage:"There was an error while saving the post to the database." })
            })

})

//returns all post objects
router.get('/', (req, res) => {
    Posts.find().then(posts=> {res.status(200).json(posts)})

})

//get specific post at id
router.get('/:id', (req, res) => {

})

// removes post at this id
router.delete('/:id', (req, res) => {

})


// udpate post at this id
router.put('/:id', (req, res) => {

})

module.exports= router;