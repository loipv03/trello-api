import { NextFunction, Request, Response } from 'express'
import User from '../../models/user'
import { IUser } from '../../interfaces/user'
import generateToken from '../../utils/token'
import { IError } from '../../interfaces/error'

export const register = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { userName, email, } = req.body as IUser
        const userNameExists = await User.findOne({ userName });
        if (userNameExists) {
            next({
                status: 11000,
                message: "userName đã tồn tại"
            } as IError)
        }

        const emailExists = await User.findOne({ email });
        if (emailExists) {
            next({
                status: 11000,
                message: "Email đã tồn tại"
            } as IError)
        }

        const newUser: IUser = await User.create({
            ...req.body,
            confirmPassword: undefined
        })

        const token = generateToken(newUser.id, '15m')
        const refreshToken = generateToken(newUser.id, '7d')
        return res.status(200).json({
            message: "Đăng kí thành công",
            access_token: token,
            refresh_Token: refreshToken
        })
    } catch (error) {
        next(error)
    }
}