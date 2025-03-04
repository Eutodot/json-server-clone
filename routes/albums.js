const express = require('express')

const { getAlbums, getAlbumById, postNewAlbum, editAlbum, deleteAlbum } = require('../services/albums')

const router = express.Router()

router.get('/', (req, res, next) => {
    const response = getAlbums(req.query)
    
    res.send(response)
})

router.get('/:id', (req, res, next) => {
    const { id } = req.params

    const response = getAlbumById(id, req.query)

    res.send(response)
})

router.post('/', (req, res, next) => {
    const newAlbum = req.body
    
    res.send(postNewAlbum(newAlbum))
})

router.put('/:id', (req, res, next) => {
    const { id } = req.params
    const newAlbum = req.body
    
    
    res.send(editAlbum(id, newAlbum))
})

router.delete('/:id', (req, res, next) => {
    const { id } = req.params
    
    res.send(deleteAlbum(id))
})

module.exports = router