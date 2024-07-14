import { NextFunction, Request, Response } from 'express'
import User from '../../models/user'
import { IUser } from '../../interfaces/user'
import { IError } from '../../interfaces/error'
import Workspace from '../../models/workspace'
import jwt from 'jsonwebtoken'
import { sendActivationEmail } from '../../configs/email.ts'

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

        const activationCode = jwt.sign({ email }, process.env.JWT_SECRET as string);

        const newUser = await User.create({
            ...req.body,
            confirmPassword: undefined,
            activationCode
        })

        await sendActivationEmail(email, activationCode);

        return res.status(200).json({
            status: 200,
            message: "Đăng kí thành công. Vui lòng kiểm tra email để kích hoạt tài khoản.",
            newUser
        });
    } catch (error) {
        next(error)
    }
}