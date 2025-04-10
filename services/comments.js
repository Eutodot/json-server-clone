const { formatData, embedData, getDbJsonData, updateDbJsonData } = require('./utils')
const { v4: uuid } = require('uuid')

const getComments = (query) => {
    const comments = getDbJsonData('comments')

    if (!comments){
        return []
    }
    
    const response = formatData(comments, query, 'comment')

    return response
}

const getCommentById = (slug, query) => {
    const comments = getDbJsonData('comments')
    const embed = query._embed

    let foundComment = comments.find(comment => comment.slug === slug)
    foundComment = embedData(foundComment, embed, 'comment')
    
    return foundComment ?? {}
}

const getCommentsByPostId = id => {
    const foundComments = comments.filter(comment => comment.postId === id)
    
    return foundComments ?? {}
}

const postNewComment = newComment => {
    const comments = getDbJsonData('comments')

    newComment.id = uuid()
    newComment.creationDate = new Date()
    comments.unshift(newComment)

    updateDbJsonData('comments.json', comments)

    return newComment
}

const editComment = (slug, newComment) => {
    const comments = getDbJsonData('comments')

    const foundIndex = comments.findIndex(comment => comment.slug === slug)
    
    if (foundIndex === -1){
        throw new Error("Comment not found :(")
    }
    const foundComment = posts[foundIndex]

    const updatedComment = { 
        ...newComment,
        creationDate: foundComment.creationDate,
        id,
        lastModified: new Date()
        // slug: generatePersonSlug({...newPerson, id})
    }

    comments.splice(foundIndex, 1, updatedComment)

    updateDbJsonData('comments.json', comments)

    return updatedComment
}

const deleteComment = slug => {
    const comments = getDbJsonData('comments')

    const foundIndex = comments.findIndex(comment => comment.slug === slug)
    if (foundIndex !== -1){
        comments.splice(foundIndex, 1)
        
        updateDbJsonData('comments.json', comments)
    } 

    return comments
}

module.exports = { getComments, getCommentById, getCommentsByPostId, postNewComment, editComment, deleteComment }