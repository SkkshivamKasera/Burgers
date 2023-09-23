import nodemailer from 'nodemailer'
import { error } from '../middlewares/error.js';

export const sendEmail = async (options) => {
    try {
        const transporter = nodemailer.createTransport({
            host: process.env.SMPT_HOST,
            port: 465,
            service: process.env.SMPT_SERVICE,
            auth: {
                user: process.env.SMPT_MAIL,
                pass: process.env.SMPT_PASSWORD
            },
        })

        const mailOptions = {
            from: process.env.SMPT_MAIL,
            to: process.env.FOUNDER_MAIL,
            subject: options.subject,
            text: options.message,
            replyTo: options.email
        }

        await transporter.sendMail(mailOptions);
    }catch (err) {
        return error(500, err.message, res)
    }
}