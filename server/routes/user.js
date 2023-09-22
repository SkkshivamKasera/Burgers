import express from 'express'
import passport from 'passport'
import { myProfile, logout, getAllUsers, getStates } from '../controllers/user.js'
import { isAdmin, isAuthenticated } from '../middlewares/auth.js'

const router = express.Router()

router.route("/googlelogin").get(passport.authenticate("google", {
    scope: ["profile"]
}))
router.route("/login").get(passport.authenticate("google", {
    successRedirect: process.env.FRONTEND_URL
}))
router.route("/me").get(isAuthenticated, myProfile)
router.route("/logout").get(logout)

router.route("/admin/users").get(isAuthenticated, isAdmin, getAllUsers)
router.route("/admin/states").get(isAuthenticated, isAdmin, getStates)

export default router