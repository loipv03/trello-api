import jwt, { Secret } from 'jsonwebtoken'

const generateToken = (id: number | string, time: string) => {
    const token = jwt.sign({ id }, process.env.JWT_SECRET as Secret, {
        expiresIn: time,
    });
    return token
}

export default generateToken
