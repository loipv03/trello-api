import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: Number(process.env.EMAIL_PORT),
    secure: false,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

export const sendActivationEmail = async (email: string, activationCode: string) => {
    const activationUrl = `http://localhost:8080/api/users/activate/${activationCode}`;
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Account Activation',
        text: `Please activate your account by clicking the following link: ${activationUrl}`
    };

    await transporter.sendMail(mailOptions);
};
