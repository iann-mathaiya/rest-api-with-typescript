import http from 'http'
import cors from 'cors'
import router from './router'
import express from 'express'
import mongoose from 'mongoose'
import bodyParser from 'body-parser'
import compression from 'compression'
import cookieParser from 'cookie-parser'

const app = express()

app.use(cors({
    credentials : true,
}))

app.use(compression())
app.use(cookieParser())
app.use(bodyParser.json())

const server = http.createServer(app)

server.listen(8080, ()=>{
    console.log('Running server on port 8080')
})

const MONGO_URL = 'mongodb+srv://Ian:qIV9SoOTaxB9xBR6@cluster0.qgwaiej.mongodb.net/?retryWrites=true&w=majority'

mongoose.Promise = Promise
mongoose.connect(MONGO_URL)
mongoose.connection.on('error', (error: Error) => console.log(error))

app.use('/', router())