const express = require('express')

const { deleteComment, postNewComment, editComment, getComments, getCommentById } = require('../services/comments')

const router = express.Router()

router.get('/', (req, res, next) => {
    const response = getComments(req.query)

    res.send(response)
})

router.get('/:slug', (req, res, next) => {
    const { slug } = req.params

    const response = getCommentById(slug, req.query)

    res.send(response)
})

router.post('/', (req, res, next) => {
    const newComment = req.body
    
    res.send(postNewComment(newComment))
})

router.put('/:slug', (req, res, next) => {
    const { slug } = req.params
    const newComment = req.body
    
    
    res.send(editComment(slug, newComment))
})

router.delete('/:slug', (req, res, next) => {
    const { slug } = req.params
    
    res.send(deleteComment(slug))
})

module.exports = router