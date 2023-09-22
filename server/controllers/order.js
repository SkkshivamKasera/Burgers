import { error } from "../middlewares/error.js"
import { Order } from "../models/Order.js"
import { Payment } from "../models/Payment.js"
import { instance } from "../server.js"
import crypto from 'crypto'

export const createOrder = async (req, res) => {
    try{
        const {
            shippingInfo,
            orderItems,
            paymentMethod,
            itemsPrice,
            taxPrice,
            shippingPrice,
            totalPrice
        } = req.body
        const user = req.user._id
        const orderOptions = {
            shippingInfo,
            orderItems,
            paymentMethod,
            itemsPrice,
            taxPrice,
            shippingPrice,
            totalPrice,
            user
        }
        await Order.create(orderOptions)
        res.status(200).json({ success: true, message: "Order Placed Successfully Via Cash On Delivery" })
    }catch(err){
        return error(500, err.message, res)
    }
}

export const createOnlineOrder = async (req, res) => {
    try{
        const {
            shippingInfo,
            orderItems,
            paymentMethod,
            itemsPrice,
            taxPrice,
            shippingPrice,
            totalPrice
        } = req.body
        const user = req.user._id
        const orderOptions = {
            shippingInfo,
            orderItems,
            paymentMethod,
            itemsPrice,
            taxPrice,
            shippingPrice,
            totalPrice,
            user
        }
        const options = {
            amount: Number(totalPrice)*100,
            currency: "INR",
        }
        const order = await instance.orders.create(options)
        res.status(200).json({ success: true, order, orderOptions})
    }catch(err){
        return error(500, err.message || err.error.description, res)
    }
}

export const paymentVerification = async (req, res) => {
    try{
        const { 
            razorpay_payment_id, 
            razorpay_order_id, 
            razorpay_signature, 
            orderOptions 
        } = req.body
        const body = razorpay_order_id + "|" + razorpay_payment_id
        const expectedSignature = crypto.createHmac("sha256", process.env.RAZORPAY_KEY_SECRET).update(body).digest("hex")
        const isAuthentic = expectedSignature === razorpay_signature
        if(isAuthentic)
        {
            const payment = await Payment.create({
                razorpay_order_id,
                razorpay_payment_id,
                razorpay_signature
            })
            await Order.create({
                ...orderOptions,
                paymentInfo: payment._id,
                paidAt: new Date(Date.now())
            })
            res.status(200).json({ success: true, message: `Order Placed Successfully, Payment Id : ${payment._id}` })
        }
        else
        {
            return error(400, "Payment Failed", res)
        }
    }catch(err){
        return error(500, err.message, res)
    }
}

export const getMyOrders = async (req, res) => {
    try{
        const orders = await Order.find({user: req.user._id}).populate("user", "name")
        res.status(200).json({success: true, orders})
    }catch(err){
        return error(500, err.message, res)
    }
}

export const getOrderDetails = async (req, res) => {
    try{
        const { id } = req.params
        const order = await Order.findById(id).populate("user", "name")
        res.status(200).json({success: true, order})
    }catch(err){
        return error(500, err.message, res)
    }
}

export const getAllOrders = async (req, res) => {
    try{
        const orders = await Order.find().populate("user", "name")
        res.status(200).json({success: true, orders})
    }catch(err){
        return error(500, err.message, res)
    }
}

export const processOrder = async(req, res) => {
    try{
        const { id } = req.params
        const order = await Order.findById(id)
        if(order.orderStatus === "Preparing"){
            order.orderStatus = "Shippped"
        }
        else if(order.orderStatus === "Shippped"){
            order.orderStatus = "Delivered"
            order.deliveredAt = new Date(Date.now())
        }
        else{
            return error(400, `Food is Already Delivered At : ${order.deliveredAt}`, res)
        }
        await order.save()
        res.status(200).json({success: true, message: `Success, Now Order Status is : ${order.orderStatus}`})
    }catch(err){
        return error(500, err.message, res)
    }
}