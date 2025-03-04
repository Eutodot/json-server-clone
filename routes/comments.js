const express = require('express')

const { deleteComment, postNewComment, editComment, getComments, getCommentById } = require('../services/comments')

const router = express.Router()

router.get('/', (req, res, next) => {
    const response = getComments(req.query)

    res.send(response)
})

router.get('/:id', (req, res, next) => {
    const { id } = req.params

    const response = getCommentById(id, req.query)

    res.send(response)
})

router.post('/', (req, res, next) => {
    const newComment = req.body
    
    res.send(postNewComment(newComment))
})

router.put('/:id', (req, res, next) => {
    const { id } = req.params
    const newComment = req.body
    
    
    res.send(editComment(id, newComment))
})

router.delete('/:id', (req, res, next) => {
    const { id } = req.params
    
    res.send(deleteComment(id))
})

module.exports = router