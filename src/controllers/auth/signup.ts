import { NextFunction, Request, Response } from 'express'
import User from '../../models/user'
import { IUser } from '../../interfaces/user'
import generateToken from '../../utils/token'
import { IError } from '../../interfaces/error'

export const signup = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { userName, email, } = req.body as IUser
        const userNameExists = await User.findOne({ userName });
        if (userNameExists) {
            return next({
                status: 400,
                message: "userName đã tồn tại"
            } as IError)
        }

        const emailExists = await User.findOne({ email });
        if (emailExists) {
            return next({
                status: 400,
                message: "Email đã tồn tại"
            } as IError)
        }

        await User.create({
            ...req.body,
            confirmPassword: undefined
        })

        return res.status(200).json({
            status: 200,
            message: "Đăng kí thành công",
        })
    } catch (error) {
        next(error)
    }
}