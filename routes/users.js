const express = require('express')

const { getUsers, getUserById, postNewUser, editUser, deleteUser } = require('../services/users')

const router = express.Router()

router.get('/', (req, res, next) => {
    const response = getUsers(req.query)

    res.send(response)
})

router.get('/:id', (req, res, next) => {
    const { id } = req.params

    const response = getUserById(id, req.query)

    res.send(response)
})

router.post('/', (req, res, next) => {
    const newUser = req.body
   
    
    res.send(postNewUser(newUser))
})

router.put('/:id', (req, res, next) => {
    const { id } = req.params
    const newUser = req.body
    
    res.send(editUser(id, newUser))
})

router.delete('/:id', (req, res, next) => {
    const { id } = req.params
    
    res.send(deleteUser(id))
})

module.exports = router