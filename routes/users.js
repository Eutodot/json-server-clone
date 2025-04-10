const express = require('express')

const { getUsers, getUserById, postNewUser, editUser, deleteUser } = require('../services/users')

const router = express.Router()

router.get('/', (req, res, next) => {
    const response = getUsers(req.query)

    res.send(response)
})

router.get('/:slug', (req, res, next) => {
    const { slug } = req.params

    const response = getUserById(slug, req.query)

    res.send(response)
})

router.post('/', (req, res, next) => {
    const newUser = req.body
   
    
    res.send(postNewUser(newUser))
})

router.put('/:slug', (req, res, next) => {
    const { slug } = req.params
    const newUser = req.body
    
    res.send(editUser(slug, newUser))
})

router.delete('/:slug', (req, res, next) => {
    const { slug } = req.params
    
    res.send(deleteUser(slug))
})

module.exports = router