const { embedData, formatData, getDbJsonData, updateDbJsonData, filterData, generateSlug } = require('./utils')
const { v4: uuid } = require('uuid')

const getPosts = (query = {}) => {
    const posts = getDbJsonData('posts')  
      
    if (!posts){
        return []
    }

    const response = formatData(posts, query, 'post')

    return response
}

const getPostById = (slug, query = {}) => {
    const posts = getDbJsonData('posts')
    const embed = query._embed
    // console.log(id)
    let foundPost = posts.find(post => post.slug === slug)
    foundPost = embedData(foundPost, embed, 'post')

    return foundPost ?? {}
}

// const getMultiplePostsById = (idArray, query) => {
//     const posts = getDbJsonData('posts')
//     const embed = query._embed

//     const foundPosts = []
    
//     idArray.forEach(id => {
//         let foundPost = posts.find(post => post.id === id)
//         foundPost = embedData(foundPost, embed, 'post')
//         foundPosts.push(foundPost)
//     })

//     return foundPosts ?? []
// }

const getPostsByUserId = id => {
    const foundPosts = posts.filter(post => post.userId === id)
    
    return foundPosts
}

const postNewPost = newPosts => {
    const posts = getDbJsonData('posts')
   
    const postsToCreate = [newPosts].flat()
    
    postsToCreate.forEach(newPost => {
        // newPost.id = uuid()
        // newPost.creationDate = new Date()
        // slug: generatePersonSlug({...newPerson, id})
        const createdPost = {
            ...newPost,
            id: uuid(),
            creationDate: new Date(),
            slug: generateSlug(newPost.title, posts)
        }
        
        posts.unshift(createdPost)
    })

    updateDbJsonData('posts', posts)

    return postsToCreate
}

const editPost = (slug, newPost) => {
    const posts = getDbJsonData('posts')

    const foundIndex = posts.findIndex(post => post.slug === slug)
    
    if (foundIndex === -1){
        throw new Error("Post not found :(")
    }
    const foundPost = posts[foundIndex]

    const updatedPost = { 
        // ...foundPost,
        ...newPost,
        creationDate: foundPost.creationDate,
        //id,
        lastModified: new Date(),
        slug: generateSlug(newPost.title, posts)
    }

    posts.splice(foundIndex, 1, updatedPost)

    updateDbJsonData('posts', posts)

    return updatedPost
}

const deleteMultiplePosts = query => {
    const posts = getDbJsonData('posts')

    const filteredData = filterData(posts, query)

    filteredData.forEach(item => {
        const foundIndex = posts.findIndex(post => post.id === item.id)
        if (foundIndex !== -1){
            posts.splice(foundIndex, 1)
        }
    })

    updateDbJsonData('posts', posts)

    return posts
}

const deletePost = slug => {
    const posts = getDbJsonData('posts')
    //console.log("🚀 ~ posts:", posts)
    const foundIndex = posts.findIndex(post => post.slug === slug)
    if (foundIndex !== -1){
        posts.splice(foundIndex, 1)
        
        updateDbJsonData('posts', posts)
    }

    return posts
}

module.exports = { getPosts, getPostById, getPostsByUserId, postNewPost, editPost, deleteMultiplePosts, deletePost }