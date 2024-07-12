import { NextFunction, Request, Response } from 'express'
import User from '../../models/user'
import { IUser } from '../../interfaces/user';
import { IError } from '../../interfaces/error';
import deleteFile from '../../utils/deleteFile';
import { bodySchema } from '../../validations/auth'

const uploadAvatar = async (req: Request, res: Response, next: NextFunction) => {
    try {
        if (!req.file) return next({ status: 404, message: "Vui lòng chọn 1 hình ảnh" } as IError)

        const { error } = bodySchema.validate(req.body, { abortEarly: false });
        if (error) throw error

        const userId: string = req.params.id

        const user: IUser | null = await User.findOne({ _id: userId });
        if (!user) throw Error("Tài khoản không tồn tại")

        const result = await User.updateOne({ _id: userId }, { avatar: req.file.path })

        req.file && !result && await deleteFile(req.file.filename)

        return res.status(200).json({
            status: 200,
            message: "Cập nhật avatar thành công",
        })

    } catch (error) {
        req.file && await deleteFile(req.file?.filename)
        return next(error)
    }
}

export default uploadAvatar