import jwt, { Secret } from 'jsonwebtoken'
import { IUser } from '../../interfaces/user.interface'
import { string } from 'joi';

const generateToken = (user: IUser, time: string) => {
    const token = jwt.sign({ user }, process.env.JWT_SECRET as Secret, {
        expiresIn: time,
    });
    return token
}

export default generateToken