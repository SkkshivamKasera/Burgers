import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    shippingInfo: {
        hNo: {
            type: String,
            required: true
        },
        city: {
            type: String,
            required: true
        },
        state: {
            type: String,
            required: true
        },
        country: {
            type: String,
            required: true
        },
        pinCode: {
            type: Number,
            required: true
        },
        phoneNo: {
            type: Number,
            required: true
        },
    },
    orderItems: {
        cheeseBurger: {
            price: {
                type: Number,
                required: true
            },
            quantity: {
                type: Number,
                required: true
            }
        },
        vegCheeseBurger: {
            price: {
                type: Number,
                required: true
            },
            quantity: {
                type: Number,
                required: true
            }
        },
        cheeseBurgerWithFries: {
            price: {
                type: Number,
                required: true
            },
            quantity: {
                type: Number,
                required: true
            }
        },
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: "users",
        required: true
    },
    paymentMethod: {
        type: String,
        enum: ["COD", "Online"],
        default: "COD"
    },
    paymentInfo: {
        type: mongoose.Schema.ObjectId,
        ref: "payments"
    },
    paidAt: Date,
    itemsPrice: {
        type: Number,
        default: 0
    },
    taxPrice: {
        type: Number,
        default: 0
    },
    shippingPrice: {
        type: Number,
        default: 0
    },
    totalPrice: {
        type: Number,
        default: 0
    },
    orderStatus: {
        type: String,
        enum: ["Preparing", "Shippped", "Delivered"],
        default: "Preparing"
    },
    deliveredAt: Date,
    createdAt: {
        type: Date,
        default: Date.now
    }
})

export const Order = mongoose.model("orders", orderSchema)