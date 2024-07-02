import { NextFunction, Request, Response } from 'express'
import User from '../../models/user.model'
import jwt, { Secret } from 'jsonwebtoken'
import bcryptjs from 'bcryptjs'
import { IUser } from '../../interfaces/user.interface'
import generateToken from './token'

export const register = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { password }: IUser = await req.body

        const hashedPassword = await bcryptjs.hash(password, 10)

        const newUser: IUser = await User.create({
            ...req.body,
            password: hashedPassword,
            confirmPassword: undefined
        })

        const token = generateToken(newUser, '15m')
        return res.status(200).json({
            message: "Đăng kí thành công",
            access_token: token
        })
    } catch (error) { next(error) }
}