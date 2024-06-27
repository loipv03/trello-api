import { Request, Response } from 'express'
import User from '../models/user.model'
import { userValidationSchema } from '../validations/user.validation'

export const register = async (req: Request, res: Response) => {
    try {
        const { error } = userValidationSchema.validate(req.body, { abortEarly: false })
        if (error) {
            throw error.details.map((err) => err.message)
        }

        const data = await User.create(req.body)
        return res.status(200).json({
            message: "Đăng kí thành công",
            user: data
        })
    } catch (error) {
        return res.status(400).json({
            error
        })
    }
}