const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const postsRoutes = require('./routes/posts')
const usersRoutes = require('./routes/users')
const albumsRoutes = require('./routes/albums')
const photosRoutes = require('./routes/photos')
const commentsRoutes = require('./routes/comments')

const app = express()

app.use(cors())
app.use(express.json())
app.use(bodyParser.urlencoded({extended: true}))

app.use('/posts', postsRoutes)
app.use('/users', usersRoutes)
app.use('/albums', albumsRoutes)
app.use('/photos', photosRoutes)
app.use('/comments', commentsRoutes)


app.listen(process.env.PORT, () => console.log(`Server is running on ${process.env.PORT}`))