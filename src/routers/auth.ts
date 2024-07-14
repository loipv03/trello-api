import express from 'express'
import { signup } from '../controllers/auth/signup'
import validate from '../utils/errorUtils'
import { siginupSchema, signinSchema } from '../validations/auth'
import { signin } from '../controllers/auth/signin'
import upload from '../configs/cloudinary'
import uploadAvatar from '../controllers/auth/uploadAvatar'
import authenticate from '../middlewares/authenticate'
import { activateUser } from '../controllers/auth/activateUser'

const userRouter = express.Router()

userRouter.post(
    '/signup',
    validate(siginupSchema),
    signup)

userRouter.post(
    '/signin',
    validate(signinSchema),
    signin)

userRouter.post(
    '/update_avatar',
    authenticate,
    upload.single('avatar'),
    uploadAvatar)

userRouter.get('/users/activate/:activationCode', activateUser);

export default userRouter