const express = require('express')

const { getPosts, getPostById, postNewPost, editPost, deletePost, deleteMultiplePosts } = require('../services/posts')

const router = express.Router()

router.get('/', (req, res, next) => {
    const response = getPosts(req.query)

    res.send(response)
})

router.get('/:slug', (req, res, next) => {
    const { slug } = req.params

    const response = getPostById(slug, req.query)

    res.send(response)
})

router.post('/', (req, res, next) => {
    const newPost = req.body
    
    res.send(postNewPost(newPost))
})

router.put('/:slug', (req, res, next) => {
    const { slug } = req.params
    const newPost = req.body
    
    
    res.send(editPost(slug, newPost))
})

router.delete('/', (req, res, next) => {
    const query = req.query
    
    res.send(deleteMultiplePosts(query))
})

router.delete('/:slug', (req, res, next) => {
    const { slug } = req.params
    const dependant = req.query._dependant
    console.log(dependant)
    res.send(deletePost(slug))
})

module.exports = router