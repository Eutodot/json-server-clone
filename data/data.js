const albums = require("./albums")
const comments = require("./comments")
const photos = require("./photos")
const posts = require("./posts")
const users = require("./users")

const data = {
    posts,
    users,
    albums,
    photos,
    comments
}

module.exports = data