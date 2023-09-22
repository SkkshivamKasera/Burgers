import express, { urlencoded } from 'express'
import UserRouter from './routes/user.js'
import OrderRouter from './routes/order.js'
import cookieParser from 'cookie-parser'
import session from 'express-session'
import dotenv from 'dotenv'
import passport from 'passport'
import cors from 'cors'

dotenv.config({path: './server/config/config.env'})
export const app = express()
app.use(express.json())
app.use(urlencoded({extended: true}))
app.use(cookieParser())
app.use(cors({
    credentials: true,
    origin: process.env.FRONTEND_URL,
    methods: ["GET", "POST", "PUT", "DELETE"]
}))
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: process.env.NODE_ENV === "development"? false : true,
        httpOnly: process.env.NODE_ENV === "development"? false : true,
        sameSite: process.env.NODE_ENV === "development"? false : "none"
    }
}))
app.use(passport.authenticate("session"))
app.use(passport.initialize())
app.use(passport.session())
app.enable("trust proxy")

app.use('/api/v1', UserRouter)
app.use('/api/v1', OrderRouter)

app.get("/", (req, res) => {
    res.send("Server is running")
})