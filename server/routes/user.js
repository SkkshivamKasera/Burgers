import express from 'express'
import passport from 'passport'
import { myProfile, logout, getAllUsers, getStates, contactForm, getContacts } from '../controllers/user.js'
import { isAdmin, isAuthenticated } from '../middlewares/auth.js'

const router = express.Router()

router.route("/googlelogin").get(passport.authenticate("google", {
    scope: ["profile"]
}))
router.get("login", passport.authenticate("google", {
    scope: ["profile"],
    successRedirect: process.env.FRONTEND_URL
}))
router.route("/me").get(isAuthenticated, myProfile)
router.route("/logout").get(logout)

router.route("/admin/users").get(isAuthenticated, isAdmin, getAllUsers)
router.route("/admin/states").get(isAuthenticated, isAdmin, getStates)
router.route("/contact").post(contactForm)
router.route("admin/contact/all").get(isAuthenticated, isAdmin, getContacts)

export default router