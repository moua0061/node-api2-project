
const express = require('express');
const Post = require('./posts-model');
const router = express.Router();

router.get('/', (req, res) => {
    Post.find()
        .then(posts => {
            res.status(200).json(posts)
        })
        .catch(err => {
            res.status(500).json({
                message: 'The posts information could not be retrieved',
                error: err.message
            })
        })
});


router.get('/:id', (req, res) => {
    Post.findById(req.params.id)
        .then(post => {
            if(!post){
                res.status(404).json({
                    message: 'The post with the specified ID does not exist'
                })
            } else {
                res.status(200).json(post)
            }
        })
        .catch(err => {
            res.status(500).json({
                message: 'The post information could not be retrieved',
                error: err.message
            })
        })
})

router.post('/', (req, res) => {
    Post.insert(req.body)
        .then(newPost => {
            if(!req.body.title || !req.body.contents) {
                res.status(400).json({
                    message: 'Please provide title and contents for the post'
                })
            } else {
                // const returnedPost = Post.findById(newPost)
                // res.status(202).json(newPost)
                console.log(Post.findById(newPost.id))
            }
        })
        .catch(err => {
            res.status(500).json({
                message: 'There was an error while saving the post to the database',
                error: err.message
            })
        })
})

// router.post('/',async (req, res) => {
//     const { title, contents } = req.body

//     try {
//         if(!title || !contents) {
//             res.status(400).json({
//                 message: "Please provide title and contents for the post"
//             })
//         } else {
//             const newPost = await Posts.insert(req.body)
//             const returnedPost = await Posts.findById(newPost.id)
//             res.status(201).json(returnedPost)
//         }
//     }
//     catch (err) {
//         res.status(500).json({
//             message: 'There was an error while saving the post to the database',
//             error: err.message,
//         })
//     }
// })

router.put('/:id', (req, res) => {
    const {id} = req.params
    const {body} = req.body
    Post.update(id, body)  
        .then(updatedPost => {
            if(!id) {
                res.status(404).json({
                    message: 'The post with the specified ID does not exist'
                })
            } else if (!body.title || !body.contents) {
                res.status(400).json({
                    message: 'Please provide title and contents for the post'
                })
            } else {
                res.status(200).json(updatedPost)
            }
        })
        .catch(err => {
            res.status(500).json({
                message: 'The post information could not be modified',
                error: err.message
            })
        })
})

module.exports = router;