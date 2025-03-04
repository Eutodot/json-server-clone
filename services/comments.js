const comments = require('../data/comments')
const { sliceData, sortData, formatData } = require('./utils')

const getComments = (query) => {
    if (!comments){
        return []
    }
    
    const response = formatData(comments, query, 'comment')

    return response
}

const getCommentById = (id, query) => {
    const embed = query._embed

    const foundComment = comments.find(comment => comment.id === id)
    foundComment = embedData(foundComment, embed, 'comment')
    
    return foundComment ?? {}
}

const getCommentsByPostId = id => {
    const foundComments = comments.filter(comment => comment.postId === id)
    
    return foundComments ?? {}
}

const postNewComment = newComment => {
    newComment.id = Math.random().toString().slice(2, 7)
    newComment.creationDate = new Date()
    comments.unshift(newComment)

    return newComment
}

const editComment = (id, newComment) => {
    const updatedComment = { 
        ...newComment,
        id,
        lastModified: new Date()
        // slug: generatePersonSlug({...newPerson, id})
    }

    const foundIndex = comments.findIndex(comment => comment.id === id)
    if (foundIndex !== -1){
        comments.splice(foundIndex, 1, updatedComment)
    } 

    return updatedComment
}

const deleteComment = id => {
    const foundIndex = comments.findIndex(comment => comment.id === id)
    if (foundIndex !== -1){
        comments.splice(foundIndex, 1)
    } 

    return comments
}

module.exports = { getComments, getCommentById, getCommentsByPostId, postNewComment, editComment, deleteComment }