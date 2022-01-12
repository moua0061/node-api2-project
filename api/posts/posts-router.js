
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

router.post('/', async (req, res) => {
    const { title, contents } = req.body
    if(!title || !contents) {
        res.status(400).json({
            message: 'Please provide title and contents for the post'
        })
    } else {
        Post.insert({title, contents})
            .then(({ id }) => {
                return Post.findById(id)
            })
            .then(newPost => {
                res.status(201).json(newPost)
            })
            .catch(err => {
                res.status(500).json({
                    message: 'There was an error while saving the post to the database',
                    error: err.message
                })
            })
    }
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
    const changes = req.body
    Post.update(id, changes)  
        .then(updatedPost => {
            if(!id) {
                res.status(404).json({
                    message: 'The post with the specified ID does not exist'
                })
            } else if (!changes.title || !changes.contents) {
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

router.delete('/:id', (req, res) => {
    Post.remove(req.params.id)
        .then(removedPost => {
            if(!req.params.id) {
                res.status(404).json({
                    message: 'The post with the specified ID does not exist'
                })
            } else {
                res.status(200).json(removedPost)
                // console.log(removedPost)
            }
        })
        .catch(err => {
            res.status(500).json({
                message: 'The post could not be removed',
                error: err.message
            })
        })
})

router.get('/:id/comments', (req, res) => {
    Post.findCommentById(req.params.id)
        .then(postComments => {
            if(!req.params.id) {
                res.status(404).json({
                    message: 'The post with the specified ID does not exist'
                })
            } else {
                res.status(200).json(postComments)
            }
        })
        .catch(err => {
            res.status(500).json({
                message: 'The comments information could not be retrieved',
                error: err.message
            })
        })
})


module.exports = router;