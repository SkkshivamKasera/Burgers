export const error = (statusCode, message, res) => {
    res.status(statusCode).json({success: false, message: message})
}