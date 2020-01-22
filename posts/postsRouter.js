const express = require('express');
const router = express.Router();
const Posts = require('../models/posts-model');

//create post using the information sent inside the request body
router.post('/', (req, res) => {

    (!req.body.title || !req.body.contents) ? (res.status(400).json({ errorMessage: "Please provide title and contents for the post." }))
        :
        Posts.insert(req.body)
            .then(post => {
                post ?
                    res.status(201).json({ "post": [req.body.title, req.body.contents, post], message: `A post: '${req.body.title}', was successfully added to the database with id ${post.id} and contents of '${req.body.contents.length} chars'.` }) :
                    res.status(401).json({ errorMessage: "A post with that ID was not found in the database" })
            })
            .catch(error => {
                console.log(error);
                res.status(500).json({ errorMessage: "There was an error while saving the post to the database." })
            })

})

//returns all post objects
router.get('/', (req, res) => {
    Posts.find()
        .then(posts => {
            res
                .status(200)
                .json(posts);
        })
        .catch(error => {
            console.log(error);
            res
                .status(500)
                .json({ error: "The posts could not be retrieved." });
        });

})

//get specific post at id
router.get('/:id', (req, res) => {
    Posts.findById(req.params.id)
        .then(post => {
            (post.length > 0) ?
                (res
                    .status(200)
                    .json(post))
                :
                (res
                    .status(404)
                    .json({ message: `The post with specified ID:[ ${req.params.id} ] does not exist.` }))
        })
        .catch(error => {
            console.log(error);
            res
                .status(500)
                .json({ error: "The post information could not be retrieved." });
        });
});
const raw = {
    item1: { key: 'sdfd', value: 'sdfd' },
    item2: { key: 'sdfd', value: 'sdfd' },
    item3: { key: 'sdfd', value: 'sdfd' }
};

// removes post at this id
router.delete('/:id', async (req, res) => {
    const goner = await Posts.findById(req.params.id) || null
    const ghostID = { ...goner }

    console.log("goner", goner[0], "ghostid", ghostID["0"])

    Posts.remove(req.params.id)
        .then(count => {
            count > 0 ?
                res.status(200).json({ goner, message: `The post with ID [${ghostID["0"].id}] was successfully removed from the database.` })
                :
                res.status(404).json({ message: `The post with specified ID [${req.params.id}] does not exist.` });
        })
        .catch(error => {
            console.log(error);
            res
                .status(500)
                .json({ error: `The post with specified ID [${req.params.id}] could not be removed.` });
        });
})


// udpate post at this id
router.put('/:id', (req, res) => {
    changes = req.body;
    (!changes.title || !changes.contents)
        ?
        (res
            .status(400)
            .json({ errorMessage: "Please provide title and contents for the post." }))
        :
        Posts.update(req.params.id, changes)
            .then(post => {
                post ?
                    res.status(200).json({ post })
                    :
                    res.status(404).json({ message: `The post the the specified ID: [${req.params.id}] does not exist.` })
            })
})


//get comments
router.get('/:id/comments', (req, res) => {
    Posts.findPostComments(req.params.id)
        .then(comments =>
            comments ?
                res.status(200).json({ comments })
                :
                res.status(404).json({ message: `The post with the specified ID ${req.params.id} does not exist.` }))
        .catch(error => {
            console.error(error);
            res
                .status(500)
                .json({ error: "There was an error retrieving the comments from the database." })
        })

})



//create a comment at specific post
router.post('/:id/comments', (req, res) => {

    (req.body.text)
        ?
        (
            Posts.findById(req.params.id)
                .then(([post]) => {
                    (post)
                        ?
                        (
                            Posts.insertComment({ ...req.body, post_id: req.params.id })
                                .then(({ id }) => {
                                    Posts.findCommentById(id)
                                        .then(([comment]) => {
                                            res
                                                .status(201)
                                                .json(comment);
                                        });
                                })
                                .catch(error => {
                                    res
                                        .status(500)
                                        .json({ error: "There as an error getting the newly created Comment." })
                                })
                        )
                        :
                        (
                            res
                                .status(404)
                                .json({ message: `The post with the specified ID was not found.` })
                        )
                })
                .catch(error => {
                    res
                        .status(500)
                        .json({ error: "There was an error while saving the comment to the database." })
                })
        )
        :
        (
            res.status(400).json({ message: "Please provide text for the comment." })
        )
})

module.exports = router;