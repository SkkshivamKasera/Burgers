import { error } from "./error.js"
export const isAuthenticated = (req, res, next) => {
    try {
        const token = req.cookies["connect.sid"]
        if (!token) {
            return error(401, "Not Logged In", res)
        }
        next()
    }catch(err){
        return error(500, err.message, res)
    }
}
export const isAdmin = (req, res, next) => {
    try {
        if(req.user && req.user.role !== "admin"){
            return error(404, "You cannot access this resource", res)
        }
        next()
    }catch(err){
        return error(500, err.message, res)
    }
}