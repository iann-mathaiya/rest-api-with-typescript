import http from 'http'
import cors from 'cors'
import dotenv from 'dotenv'
import router from './router'
import express from 'express'
import mongoose from 'mongoose'
import bodyParser from 'body-parser'
import compression from 'compression'
import cookieParser from 'cookie-parser'

dotenv.config()

const app = express()

app.use(cors({
    credentials : true,
}))

app.use(compression())
app.use(cookieParser())
app.use(bodyParser.json())

const server = http.createServer(app)

server.listen(8080, () => {
    console.log('Running server on port 8080')
})

mongoose.Promise = Promise
mongoose.connect(process.env.MONGO_URI)
mongoose.connection.on('error', (error: Error) => console.log(error))

app.use('/', router())