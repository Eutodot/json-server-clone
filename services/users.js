const users = require('../data/users')
const { embedData, formatData } = require('./utils')

const getUsers = (query) => {
    if (!users){
        return []
    }
    
    const response = formatData(users, query, 'user')

    return response
}

const getUserById = (id, query) => {
    const embed = query._embed

    let foundUser = users.find(user => user.id === id)
    foundUser = embedData(foundUser, embed, 'user')

    return foundUser ?? {}
}

const postNewUser = newUser => {
    newUser.id = Math.random().toString().slice(2, 7)
    newUser.creationDate = new Date()
    users.push(newUser)
    
    return newUser
}

const editUser = (id, newUser) => {
    const updatedUser = { 
        ...newUser,
        id,
        lastModified: new Date()
        // slug: generatePersonSlug({...newPerson, id})
    }
    
    const foundIndex = users.findIndex(user => user.id === id)
    if (foundIndex !== -1){
        users.splice(foundIndex, 1, updatedUser)
    } 

    return updatedUser
}

const deleteUser = id => {
    const foundIndex = users.findIndex(user => user.id === id)
    if (foundIndex !== -1){
        users.splice(foundIndex, 1)
    } 

    return users
}

module.exports = { getUsers, getUserById, postNewUser, editUser, deleteUser }