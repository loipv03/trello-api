import express from 'express'
import { register } from '../controllers/auth/signup'
import { validate } from '../middlewares/validation'
import userSchema from '../validations/user'

const userRouter = express.Router()

userRouter.post(
    '/signup',
    validate(userSchema),
    register)

export default userRouter