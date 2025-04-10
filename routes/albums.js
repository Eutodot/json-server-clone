const express = require('express')

const { getAlbums, getAlbumById, postNewAlbum, editAlbum, deleteAlbum } = require('../services/albums')

const router = express.Router()

router.get('/', (req, res, next) => {
    const response = getAlbums(req.query)
    
    res.send(response)
})

router.get('/:slug', (req, res, next) => {
    const { slug } = req.params

    const response = getAlbumById(slug, req.query)

    res.send(response)
})

router.post('/', (req, res, next) => {
    const newAlbum = req.body
    
    res.send(postNewAlbum(newAlbum))
})

router.put('/:slug', (req, res, next) => {
    const { slug } = req.params
    const newAlbum = req.body
    
    
    res.send(editAlbum(slug, newAlbum))
})

router.delete('/:slug', (req, res, next) => {
    const { slug } = req.params
    
    res.send(deleteAlbum(slug))
})

module.exports = router