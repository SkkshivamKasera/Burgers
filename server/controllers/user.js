import { error } from '../middlewares/error.js'
import { User } from '../models/User.js'
import { Order } from '../models/Order.js'
import { sendEmail } from '../utils/SendEmail.js'
import { Contact } from '../models/Contact.js'
export const myProfile = (req, res) => {
    try {
        res.status(200).json({ success: true, user: req.user })
    } catch (error) {
        return error(500, err.message, res)
    }
}

export const logout = (req, res, next) => {
    req.session.destroy((err) => {
        if (err) return next(err);
        res.clearCookie("connect.sid", {
            secure: process.env.NODE_ENV === "development" ? false : true,
            httpOnly: process.env.NODE_ENV === "development" ? false : true,
            sameSite: process.env.NODE_ENV === "development" ? false : "none"
        })
        res.status(200).json({ success: true, message: "Logout Successfully" })
    })
}

//Admin Panel
export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find()
        res.status(200).json({ success: true, users })
    } catch (err) {
        return error(500, err.message, res)
    }
}

export const getStates = async (req, res) => {
    try {
        let totalIncome = 0
        const usersCount = await User.countDocuments()
        const orders = await Order.find()
        const preparingOrders = orders.filter((i) => i.orderStatus === "Preparing")
        const shipppedOrders = orders.filter((i) => i.orderStatus === "Shippped")
        const deliveredOrders = orders.filter((i) => i.orderStatus === "Delivered")
        orders.forEach((i) => totalIncome += i.totalPrice)
        res.status(200).json({
            success: true,
            usersCount,
            ordersCount: {
                totalOrders: orders.length,
                preparingOrders: preparingOrders.length,
                shipppedOrders: shipppedOrders.length,
                deliveredOrders: deliveredOrders.length
            },
            totalIncome
        })
    } catch (err) {
        return error(500, err.message, res)
    }
}

export const contactForm = async (req, res) => {
    try{
        const { name, email, message } = req.body
        await sendEmail({email, subject: name, message})
        const contact = await Contact.findOne({email})
        if(contact){
            contact.message.push(message)
            await contact.save()
        }else{
            await Contact.create({
                name, email, message
            })
        }
        res.status(200).json({success: true, message: "Email Sent Successfully"})
    }catch (err) {
        return error(500, err.message, res)
    }
}

export const getContacts = async (req, res) => {
    try{
        const contacts = await Contact.find()
        res.status(200).json({success: true, contacts})
    }catch (err) {
        return error(500, err.message, res)
    }
}