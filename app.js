const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const path = require('path')

const postsRoutes = require('./routes/posts')
const usersRoutes = require('./routes/users')
const albumsRoutes = require('./routes/albums')
const photosRoutes = require('./routes/photos')
const commentsRoutes = require('./routes/comments')
const { getPosts } = require('./services/posts')

const app = express()

app.set('view engine', 'ejs')
app.set('views', path.join('views'))

app.use(cors())
app.use(express.json())
app.use(bodyParser.urlencoded({extended: true}))

app.use('/api/posts', postsRoutes)
app.use('/api/users', usersRoutes)
app.use('/api/albums', albumsRoutes)
app.use('/api/photos', photosRoutes)
app.use('/api/comments', commentsRoutes)
app.get('/posts', (req, res, next) => {
    const posts = getPosts({})
    
    res.render('posts', {title: 'Posts page', posts})
})



app.listen(process.env.PORT, () => console.log(`Server is running on ${process.env.PORT}`))