import { NextFunction, Request, Response } from 'express'
import User from '../../models/user'
import { IUser } from '../../interfaces/user'
import generateToken from '../../utils/token'
import { IError } from '../../interfaces/error'
import bcrypt from 'bcryptjs'

export const signin = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, password }: IUser = req.body
        const user: IUser | null = await User.findOne({ email });
        !user && next({ status: 404, message: "Tài khoản không tồn tại" } as IError)

        const isMatch = await bcrypt.compare(password, String(user?.password))
        !isMatch && next({ status: 401, message: "Mật khẩu không đúng" } as IError)

        const token = generateToken(String(user?.id), '15m')
        const refreshToken = generateToken(String(user?.id), '7d')

        return res.status(200).json({
            message: "Đăng nhập thành công",
            access_token: token,
            refresh_Token: refreshToken
        })
    } catch (error) {
        next(error)
    }
}