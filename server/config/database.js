import mongoose from "mongoose";

export const database_connection = async () => {
    try{
        await mongoose.connect(process.env.CLOUD_MONGO_URI)
        console.log(`Database Connected`)
    }catch(error)
    {
        console.log(error.message)
    }
}