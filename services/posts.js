const { embedData, formatData, getDbJsonData } = require('./utils')
const path = require('path')
const fs = require('fs')

const getPosts = (query) => {
    const posts = getDbJsonData('posts.json')
    
    // postsData.push({
    //     "userId": "1",
    //     "id": Math.random().toString().slice(2, 7),
    //     "title": "test",
    //     "body": "repudiandae veniam quaerat sunt sed\nalias aut fugiat sit autem sed est\nvoluptatem omnis possimus esse voluptatibus quis\nest aut tenetur dolor neque",
    //     "likes": 52
    //   })
    // fs.writeFileSync(filePath, JSON.stringify(postsData, null), 'utf8')  
      
    if (!posts){
        return []
    }

    const response = formatData(posts, query, 'post')

    return response
}

const getPostById = (id, query) => {
    const posts = getDbJsonData('posts.json')
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
    const posts = getDbJsonData('posts.json')

    newPost.id = Math.random().toString().slice(2, 7)
    newPost.creationDate = new Date()
    posts.push(newPost)

    fs.writeFileSync(path.join('./db', 'posts.json'), JSON.stringify(posts, null, 2), 'utf8')

    return newPost
}

const editPost = (id, newPost) => {
    const posts = getDbJsonData('posts.json')

    const foundIndex = posts.findIndex(post => post.id === id)
    
    if (foundIndex === -1){
        throw new Error("User not found :(")
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
    fs.writeFileSync(path.join('./db', 'posts.json'), JSON.stringify(posts, null, 2), 'utf8')

    return updatedPost
}

const deletePost = id => {
    const posts = getDbJsonData('posts.json')

    const foundIndex = posts.findIndex(post => post.id === id)
    if (foundIndex !== -1){
        posts.splice(foundIndex, 1)
        fs.writeFileSync(path.join('./db', 'posts.json'), JSON.stringify(posts, null, 2), 'utf8')
    } 

    return posts
}

module.exports = { getPosts, getPostById, getPostsByUserId, postNewPost, editPost, deletePost }