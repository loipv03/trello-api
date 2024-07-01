import express from 'express'
import cors from 'cors'
import connectMongooDB from './configs/connect'
import dotenv from 'dotenv'
import userRouter from './routers/user.router'
import errorHandler from './middlewares/validation.middleware'

dotenv.config()

const app = express()

app.use(express.json())
app.use(cors())

app.use('/api', userRouter)

app.use(errorHandler)

connectMongooDB(String(process.env.DB_URL))

export const viteNodeApp = app

