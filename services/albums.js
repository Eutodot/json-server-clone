const albums = require('../data/albums')
const { sliceData, sortData, formatData } = require('./utils')

const getAlbums = (query) => {
    if (!albums){
        return []
    }

    const response = formatData(albums, query, 'album')

    return response
}

const getAlbumById = (id, query) => {
    const embed = query._embed

    let foundAlbum = albums.find(album => album.id === id)
    foundAlbum = embedData(foundAlbum, embed, 'album')
    
    return foundAlbum ?? {}
}

const getAlbumsByUserId = id => {
    const foundAlbums = albums.filter(album => album.userId === id)
    
    return foundAlbums
}

const postNewAlbum = newAlbum => {
    newAlbum.id = Math.random().toString().slice(2, 7)
    newAlbum.creationDate = new Date()
    albums.push(newAlbum)
    
    return newAlbum
}

const editAlbum = (id, newAlbum) => {
    const updatedAlbum = { 
        ...newAlbum,
        id,
        lastModified: new Date()
        // slug: generatePersonSlug({...newPerson, id})
    }

    const foundIndex = albums.findIndex(album => album.id === id)
    if (foundIndex !== -1){
        albums.splice(foundIndex, 1, updatedAlbum)
    } 

    return updatedAlbum
}

const deleteAlbum = id => {
    const foundIndex = albums.findIndex(album => album.id === id)
    if (foundIndex !== -1){
        albums.splice(foundIndex, 1)
    } 

    return albums
}

module.exports = { getAlbums, getAlbumById, getAlbumsByUserId, postNewAlbum, editAlbum, deleteAlbum }