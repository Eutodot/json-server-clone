const posts = require('../data/posts')
const { sliceData, sortData, embedData, formatData } = require('./utils')

const getPosts = (query) => {
    if (!posts){
        return []
    }

    const response = formatData(posts, query, 'post')

    return response
}

const getPostById = (id, query) => {
    const embed = query._embed
    
    let foundPost = posts.find(post => post.id === id)
    foundPost = embedData(foundPost, embed, 'post')

    return foundPost ?? {}
}

const getPostsByUserId = id => {
    const foundPosts = posts.filter(post => post.userId === id)
    
    return foundPosts
}

const postNewPost = newPost => {
    newPost.id = Math.random().toString().slice(2, 7)
    newPost.creationDate = new Date()
    posts.push(newPost)
    
    return newPost
}

const editPost = (id, newPost) => {
    const updatedPost = { 
        ...newPost,
        id,
        lastModified: new Date()
        // slug: generatePersonSlug({...newPerson, id})
    }

    const foundIndex = posts.findIndex(post => post.id === id)
    if (foundIndex !== -1){
        posts.splice(foundIndex, 1, updatedPost)
    } 

    return updatedPost
}

const deletePost = id => {
    const foundIndex = posts.findIndex(post => post.id === id)
    if (foundIndex !== -1){
        posts.splice(foundIndex, 1)
    } 

    return posts
}

module.exports = { getPosts, getPostById, getPostsByUserId, postNewPost, editPost, deletePost }