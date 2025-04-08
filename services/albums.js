const { formatData, embedData, getDbJsonData, updateDbJsonData } = require('./utils')
const { v4: uuid } = require('uuid')

const getAlbums = (query) => {
    const albums = getDbJsonData('albums')

    if (!albums){
        return []
    }

    const response = formatData(albums, query, 'album')

    return response
}

const getAlbumById = (id, query) => {
    const albums = getDbJsonData('albums')
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
    const albums = getDbJsonData('albums')

    newAlbum.id = uuid()
    newAlbum.creationDate = new Date()
    albums.unshift(newAlbum)
    
    updateDbJsonData('albums.json', albums)

    return newAlbum
}

const editAlbum = (id, newAlbum) => {
    const albums = getDbJsonData('albums')

    const foundIndex = albums.findIndex(album => album.id === id)

    if (foundIndex === -1){
        throw new Error("Album not found :(")
    }
    const foundAlbum = posts[foundIndex]

    const updatedAlbum = { 
        ...newAlbum,
        creationDate: foundAlbum.creationDate,
        id,
        lastModified: new Date()
        // slug: generatePersonSlug({...newPerson, id})
    }

    albums.splice(foundIndex, 1, updatedAlbum)

    updateDbJsonData('albums.json', albums)

    return updatedAlbum
}

const deleteAlbum = id => {
    const albums = getDbJsonData('albums')

    const foundIndex = albums.findIndex(album => album.id === id)
    if (foundIndex !== -1){
        albums.splice(foundIndex, 1)
    } 
    
    updateDbJsonData('albums.json', albums)

    return albums
}

module.exports = { getAlbums, getAlbumById, getAlbumsByUserId, postNewAlbum, editAlbum, deleteAlbum }