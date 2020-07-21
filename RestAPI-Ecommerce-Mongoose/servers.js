const express = require('express')
const mongoose = require('mongoose')
const config = require('./config')
const http = require('http')
const userRouter = require('./routes/userRouters')

const app = express()

const url = config.mongoUrl
const connect = mongoose.connect(url)

connect.then((db) => {
       console.log('Connect DB SUCCESS!!!')
}, (err) => {
       console.log(err)
})

app.use('/users', userRouter);

const httpServer = http.createServer(app);
const PORT = 3131
httpServer.listen(PORT, () => {
       console.log(`Connect Server on Port ${PORT} success!!!`)
})