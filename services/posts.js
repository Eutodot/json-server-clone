const { embedData, formatData, getDbJsonData, updateDbJsonData, filterData } = require('./utils')

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
    // console.log(id)
    let foundPost = posts.find(post => post.id === id)
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
   
    let postsToCreate = []

    if (!newPosts.length){
        postsToCreate.push(newPosts)
    } else {
        postsToCreate = [...newPosts]
    }
    
    postsToCreate.map(newPost => {
        newPost.id = Math.random().toString().slice(2, 7)
        newPost.creationDate = new Date()
        posts.unshift(newPost)
    })

    updateDbJsonData('posts.json', posts)

    return postsToCreate
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

const deleteMultiplePosts = query => {
    const posts = getDbJsonData('posts')

    const filteredData = filterData(posts, query)

    filteredData.forEach(item => {
        const foundIndex = posts.findIndex(post => post.id === item.id)
        if (foundIndex !== -1){
            posts.splice(foundIndex, 1)
        }
    })

    updateDbJsonData('posts.json', posts)

    return posts
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

module.exports = { getPosts, getPostById, getPostsByUserId, postNewPost, editPost, deleteMultiplePosts, deletePost }