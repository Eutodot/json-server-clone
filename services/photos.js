const { formatData, embedData, getDbJsonData, updateDbJsonData } = require('./utils')
const { v4: uuid } = require('uuid')

const getPhotos = (query) => {
    const photos = getDbJsonData('photos')  

    if (!photos){
        return []
    }
    
    const response = formatData(photos, query, 'photo')

    return response
}

const getPhotoById = (id, query) => {
    const photos = getDbJsonData('photos')  
    const embed = query._embed

    let foundPhoto = photos.find(photo => photo.id === id)
    foundPhoto = embedData(foundPhoto, embed, 'photo')
    
    return foundPhoto ?? {}
}

const getPhotosByAlbumId = id => {
    const foundPhotos = photos.filter(photo => photo.albumId === id)
    
    return foundPhotos
}

const postNewPhoto = newPhoto => {
    const photos = getDbJsonData('photos')  

    newPhoto.id = uuid()
    newPhoto.creationDate = new Date()
    photos.push(newPhoto)

    updateDbJsonData('photos.json', photos)

    return newPhoto
}

const editPhoto = (id, newPhoto) => {
    const photos = getDbJsonData('photos')  

    const foundIndex = photos.findIndex(photo => photo.id === id)

    if (foundIndex === -1){
        throw new Error("Photo not found :(")
    }
    const foundPhoto = posts[foundIndex]

    const updatedPhoto = { 
        ...newPhoto,
        creationDate: foundPhoto.creationDate,
        id,
        lastModified: new Date()
        // slug: generatePersonSlug({...newPerson, id})
    }
    
    photos.splice(foundIndex, 1, updatedPhoto)
    
    updateDbJsonData('photos.json', photos)

    return updatedPhoto
}

const deletePhoto = id => {
    const photos = getDbJsonData('photos')  

    const foundIndex = photos.findIndex(photo => photo.id === id)
    if (foundIndex !== -1){
        photos.splice(foundIndex, 1)

        updateDbJsonData('photos.json', photos)
    } 

    return photos
}

module.exports = { getPhotos, getPhotoById, getPhotosByAlbumId, postNewPhoto, editPhoto, deletePhoto }