const { embedData, formatData, updateDbJsonData, getDbJsonData, filterData } = require('./utils')
const { v4: uuid } = require('uuid')

const getUsers = (query) => {
    const users = getDbJsonData('users')  
    
    if (!users){
        return []
    }
    
    const response = formatData(users, query, 'user')

    return response
}

const getUserById = (slug, query) => {
    const users = getDbJsonData('users')  
    const embed = query._embed

    let foundUser = users.find(user => user.slug === slug)
    foundUser = embedData(foundUser, embed, 'user')

    return foundUser ?? {}
}

const postNewUser = newUsers => {
    const users = getDbJsonData('users') 

    const usersToCreate = [newUsers].flat()
    
    usersToCreate.forEach(newUser => {
        const createdUser = {
            ...newUser,
            id: uuid(),
            creationDate: new Date(),
            slug: generateSlug(newUser.username, users)
        }
        
        posts.unshift(createdUser)
    })
    
    updateDbJsonData('users.json', users)

    return newUsers
}

const editUser = (slug, newUser) => {
    const users = getDbJsonData('users')  

    const foundIndex = users.findIndex(user => user.slug === slug)

    if (foundIndex === -1){
        throw new Error("Post not found :(")
    }
    const foundUser = posts[foundIndex]

    const updatedUser = { 
        ...newUser,
        creationDate: foundUser.creationDate,
        //id,
        lastModified: new Date(),
        slug: generateSlug(newUser.username, users)
    }
    
    users.splice(foundIndex, 1, updatedUser)
    

    updateDbJsonData('users.json', users)

    return updatedUser
}

const deleteMultipleUsers = query => {
    const users = getDbJsonData('users')

    const filteredData = filterData(users, query)

    filteredData.forEach(item => {
        const foundIndex = users.findIndex(user => user.id === item.id)
        if (foundIndex !== -1){
            users.splice(foundIndex, 1)
        }
    })

    updateDbJsonData('users', users)

    return users
}

const deleteUser = slug => {
    const users = getDbJsonData('users')  

    const foundIndex = users.findIndex(user => user.slug === slug)
    if (foundIndex !== -1){
        users.splice(foundIndex, 1)

        updateDbJsonData('users.json', users)
    } 

    return users
}

module.exports = { getUsers, getUserById, postNewUser, editUser, deleteUser }