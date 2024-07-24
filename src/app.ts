import express from 'express'
import cors from 'cors'
import connectMongooDB from './configs/connect'
import dotenv from 'dotenv'
import userRouter from './routers/auth'
import workspaceRouter from './routers/workspace'
import errorHandler from './middlewares/validation'
import boardRouter from './routers/board'

dotenv.config()

const app = express()

app.use(express.json())
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));

app.use('/api', userRouter)
app.use('/api', workspaceRouter)
app.use('/api', boardRouter)

app.use(errorHandler)

connectMongooDB(String(process.env.DB_URL))

export const viteNodeApp = app

