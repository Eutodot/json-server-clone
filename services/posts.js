const { embedData, formatData, getDbJsonData, updateDbJsonData } = require('./utils')

const getPosts = (query) => {
    const posts = getDbJsonData('posts')  
      
    if (!posts){
        return []
    }

    const response = formatData(posts, query, 'post')

    return response
}

const getPostById = (id, query) => {
    const posts = getDbJsonData('posts')
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
    const posts = getDbJsonData('posts')

    newPost.id = Math.random().toString().slice(2, 7)
    newPost.creationDate = new Date()
    posts.unshift(newPost)

    updateDbJsonData('posts.json', posts)

    return newPost
}

const editPost = (id, newPost) => {
    const posts = getDbJsonData('posts')

    const foundIndex = posts.findIndex(post => post.id === id)
    
    if (foundIndex === -1){
        throw new Error("Post not found :(")
    }
    const foundPost = posts[foundIndex]

    const updatedPost = { 
        // ...foundPost,
        ...newPost,
        creationDate: foundPost.creationDate,
        id,
        lastModified: new Date()
        // slug: generatePersonSlug({...newPerson, id})
    }

    posts.splice(foundIndex, 1, updatedPost)

    updateDbJsonData('posts.json', posts)

    return updatedPost
}

const deletePost = id => {
    const posts = getDbJsonData('posts')

    const foundIndex = posts.findIndex(post => post.id === id)
    if (foundIndex !== -1){
        posts.splice(foundIndex, 1)
        
        updateDbJsonData('posts.json', posts)
    }

    return posts
}

module.exports = { getPosts, getPostById, getPostsByUserId, postNewPost, editPost, deletePost }