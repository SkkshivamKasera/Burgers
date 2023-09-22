import  { app } from './app.js'
import dotenv from 'dotenv'
import { database_connection } from './config/database.js'
import { connectPassport } from './utils/Provider.js'
import Razorpay from 'razorpay'

dotenv.config({path: './server/config/config.env'})

database_connection()
connectPassport()

export const instance = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID, 
    key_secret: process.env.RAZORPAY_KEY_SECRET
})

app.listen(process.env.PORT, () => {
    console.log(`Server is running on : http://localhost:${process.env.PORT}, MODE : ${process.env.NODE_ENV}`)
})