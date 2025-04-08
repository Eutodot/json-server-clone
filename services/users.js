const { embedData, formatData, updateDbJsonData, getDbJsonData } = require('./utils')
const { v4: uuid } = require('uuid')

const getUsers = (query) => {
    const users = getDbJsonData('users')  
    
    if (!users){
        return []
    }
    
    const response = formatData(users, query, 'user')

    return response
}

const getUserById = (id, query) => {
    const users = getDbJsonData('users')  
    const embed = query._embed

    let foundUser = users.find(user => user.id === id)
    foundUser = embedData(foundUser, embed, 'user')

    return foundUser ?? {}
}

const postNewUser = newUser => {
    const users = getDbJsonData('users')  

    newUser.id = uuid()
    newUser.creationDate = new Date()
    users.unshift(newUser)
    
    updateDbJsonData('users.json', users)

    return newUser
}

const editUser = (id, newUser) => {
    const users = getDbJsonData('users')  

    const foundIndex = users.findIndex(user => user.id === id)

    if (foundIndex === -1){
        throw new Error("Post not found :(")
    }
    const foundUser = posts[foundIndex]

    const updatedUser = { 
        ...newUser,
        creationDate: foundUser.creationDate,
        id,
        lastModified: new Date()
        // slug: generatePersonSlug({...newPerson, id})
    }
    
    users.splice(foundIndex, 1, updatedUser)
    

    updateDbJsonData('users.json', users)

    return updatedUser
}

const deleteUser = id => {
    const users = getDbJsonData('users')  

    const foundIndex = users.findIndex(user => user.id === id)
    if (foundIndex !== -1){
        users.splice(foundIndex, 1)

        updateDbJsonData('users.json', users)
    } 

    return users
}

module.exports = { getUsers, getUserById, postNewUser, editUser, deleteUser }