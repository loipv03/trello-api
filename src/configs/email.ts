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
        replyTo: 'no-reply@${process.env.EMAIL_DOMAIN}',
        html: `
        <html lang="en">
            <head>
                <style>
                    h1 {
                        font-size: 28px;
                        font-family: 'Roboto';
                    }

                    button {
                        width: max-content;
                        height: max-content;
                        background-color: #0052cc; 
                        border: none; 
                        border-radius: 5px;
                        cursor: pointer;
                    }

                    a {
                        display:block;
                        color: white !important;
                        text-decoration: none;
                        padding: 10px;
                        text-align: center;
                        text-transform: capitalize;
                        font-weight: 700;
                    }
                </style>
            </head>

            <body>
                <div>
                    <h1>Please activate your account</h1>
                    <button><a href="${activationUrl}">activate account</a></button>
                </div>
            </body>
        </html>`,
    };

    await transporter.sendMail(mailOptions);
};
