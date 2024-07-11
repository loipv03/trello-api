import express from 'express'
import { register } from '../controllers/auth/register'
import validate from '../validations'
import userSchema from '../validations/user'
import upload from '../configs/cloudinary'

const userRouter = express.Router()

userRouter.post(
    '/register',
    upload.single('avatar'),
    validate(userSchema),
    register)

export default userRouter