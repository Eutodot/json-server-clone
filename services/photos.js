const photos = require('../data/photos')
const { sliceData, sortData, formatData } = require('./utils')

const getPhotos = (query) => {
    if (!photos){
        return []
    }
    
    const response = formatData(photos, query, 'photo')

    return response
}

const getPhotoById = (id, query) => {
    const embed = query._embed

    let foundPhoto = photos.find(photo => photo.id === id)
    foundPhoto = embedData(foundPhoto, embed, 'photo')
    
    return foundPhoto ?? {}
}

// const embedPhoto = (photo, embed) => {
//     if (!embed){
//         return post
//     }

//     const embedList = Array.isArray(embed) ? embed : [embed]
//     const embedData = embedList.map(item => item.toLowerCase())

//     const albumId = photo.albumId
//     const updatedPhoto = {...photo}
    
//     if (embedData.includes('album')){
//         updatedPhoto.album = getPhotosByAlbumId(albumId)
//     }
    
//     return updatedPhoto
// }

const getPhotosByAlbumId = id => {
    const foundPhotos = photos.filter(photo => photo.albumId === id)
    
    return foundPhotos
}

const postNewPhoto = newPhoto => {
    newPhoto.id = Math.random().toString().slice(2, 7)
    newPhoto.creationDate = new Date()
    photos.push(newPhoto)

    return newPhoto
}

const editPhoto = (id, newPhoto) => {
    const updatedPhoto = { 
        ...newPhoto,
        id,
        lastModified: new Date()
        // slug: generatePersonSlug({...newPerson, id})
    }
    
    const foundIndex = photos.findIndex(photo => photo.id === id)
    if (foundIndex !== -1){
        photos.splice(foundIndex, 1, updatedPhoto)
    } 

    return updatedPhoto
}

const deletePhoto = id => {
    const foundIndex = photos.findIndex(photo => photo.id === id)
    if (foundIndex !== -1){
        photos.splice(foundIndex, 1)
    } 

    return photos
}

module.exports = { getPhotos, getPhotoById, getPhotosByAlbumId, postNewPhoto, editPhoto, deletePhoto }