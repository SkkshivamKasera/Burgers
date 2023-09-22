import express from 'express'
import { isAdmin, isAuthenticated } from '../middlewares/auth.js'
import { createOnlineOrder, createOrder, getAllOrders, getMyOrders, getOrderDetails, paymentVerification, processOrder } from '../controllers/order.js'

const router = express.Router()

router.route("/createorder").post(isAuthenticated, createOrder)
router.route("/createonlineorder").post(isAuthenticated, createOnlineOrder)
router.route("/paymentverification").post(isAuthenticated, paymentVerification)
router.route("/myorders").get(isAuthenticated, getMyOrders)
router.route("/order/:id").get(isAuthenticated, getOrderDetails)

router.route("/admin/orders").get(isAuthenticated, isAdmin, getAllOrders)
router.route("/admin/order/:id").get(isAuthenticated, isAdmin, processOrder)

export default router