import { NextFunction, Request, Response } from 'express'
import User from '../../models/user'
import { IUser } from '../../interfaces/user'
import generateToken from '../../utils/jwtUtils'
import { IError } from '../../interfaces/error'
import bcrypt from 'bcryptjs'

export const signin = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, password }: IUser = req.body
        const user: IUser | null = await User.findOne({ email, isActive: 'true' });
        !user && next({ status: 404, message: "Account not found" } as IError)

        const isMatch = await bcrypt.compare(password, String(user?.password))
        !isMatch && next({ status: 401, message: "Incorrect password" } as IError)

        const token = generateToken(String(user?._id), '15m')
        const refreshToken = generateToken(String(user?._id), '7d')

        res.cookie('access_token', token, {
            httpOnly: true,
            sameSite: 'strict',
        })
        res.cookie('refresh_token', refreshToken, {
            httpOnly: true,
            sameSite: 'strict',
        })

        return res.status(200).json({
            status: 200,
            message: "Logged in successfully",
        })


    } catch (error) {
        next(error)
    }
}