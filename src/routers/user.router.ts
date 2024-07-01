import express from 'express'
import { register } from '../controllers/user.controllers'
import validate from '../validations'
import userSchema from '../validations/user.validation'

const userRouter = express.Router()

userRouter.post('/register', validate(userSchema), register)

export default userRouter