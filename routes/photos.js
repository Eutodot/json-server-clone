const express = require('express')

const { getPhotos, getPhotoById, editPhoto, deletePhoto, postNewPhoto } = require('../services/photos')

const router = express.Router()

router.get('/', (req, res, next) => {
    const response = getPhotos(req.query)

    res.send(response)
})

router.get('/:slug', (req, res, next) => {
    const { slug } = req.params
    
    const response = getPhotoById(slug, req.query)

    res.send(response)
})

router.post('/photos', (req, res, next) => {
    const newPhoto = req.body
    
    res.send(postNewPhoto(newPhoto))
})

router.put('/:slug', (req, res, next) => {
    const { slug } = req.params
    const newPhoto = req.body
    
    
    res.send(editPhoto(slug, newPhoto))
})

router.delete('/:slug', (req, res, next) => {
    const { slug } = req.params
    
    res.send(deletePhoto(slug))
})

module.exports = router