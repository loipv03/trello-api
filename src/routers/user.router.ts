import express, { Request, Response } from 'express'
import { register } from '../controllers/auth/user'
import validate from '../validations'
import userSchema from '../validations/user.validation'
import { authenticate } from '../middlewares/authenticate'

const userRouter = express.Router()

userRouter.post('/register', validate(userSchema), register)
userRouter.get('/get', authenticate, (req: Request, res: Response) => {
    return res.status(200).json({
        message: 'Oke la'
    })
})

export default userRouter