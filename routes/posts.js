const express = require('express')

const { getPosts, getPostById, postNewPost, editPost, deletePost } = require('../services/posts')

const router = express.Router()

router.get('/', (req, res, next) => {
    const response = getPosts(req.query)

    res.send(response)
})

router.get('/:id', (req, res, next) => {
    const { id } = req.params

    const response = getPostById(id, req.query)

    res.send(response)
})

router.post('/', (req, res, next) => {
    const newPost = req.body
    
    res.send(postNewPost(newPost))
})

router.put('/:id', (req, res, next) => {
    const { id } = req.params
    const newPost = req.body
    
    
    res.send(editPost(id, newPost))
})

router.delete('/:id', (req, res, next) => {
    const { id } = req.params
    
    res.send(deletePost(id))
})

module.exports = router