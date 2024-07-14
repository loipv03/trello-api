import { NextFunction, Request, Response } from 'express'
import User from '../../models/user';
import jwt from 'jsonwebtoken'
import { IError } from '../../interfaces/error';

export const activateUser = async (req: Request, res: Response, next: NextFunction) => {
    const { activationCode } = req.params;
    try {
        const decoded: any = jwt.verify(activationCode, process.env.JWT_SECRET as string);

        const existingUser = await User.findOne({ email: decoded.email });
        if (existingUser && existingUser.isActive) {
            return res.status(400).json({
                status: 400,
                message: "Your account has been successfully activated"
            });
        }

        const user = await User.findOneAndUpdate(
            { email: decoded.email, activationCode },
            { $set: { isActive: true, activationCode: '' } },
            { new: true }
        );

        if (!user) {
            return next({ status: 400, message: 'Invalid activation code' } as IError);
        }

        return res.status(400).json({
            status: 200,
            message: "Account activation successful"
        });

    } catch (error) {
        next(error)
    }
};

