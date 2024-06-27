import express from 'express'
import cors from 'cors'
import connectMongooDB from './configs/connect'
import dotenv from 'dotenv'

dotenv.config()

const app = express()

app.use(express.json())
app.use(cors())

connectMongooDB(String(process.env.DB_URL))

export const viteNodeApp = app

