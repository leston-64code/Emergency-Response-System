const errorMiddleware = (err, req, res, next) => {
    err.message = err.message || "Internal Server Error"
    err.statusCode = err.statusCode || 500

    if (err.code === 11000) {
        err.message = "Value provided already exists"
        err.statusCode = 409
        err.type = "manual"
    }

    if (err.statusCode === 401) {
        err.name = "SessionExpired"
    }

    if (err.name === "TokenExpiredError") {
        err.message = "Refresh token has expired"
        err.statusCode = 400
    }

    if (err.type) {
        return res.status(err.statusCode).json({
            success: false,
            name: err.name,
            message: err.message,
            type: err.type
        })
    }

    return res.status(err.statusCode).json({
        success: false,
        name: err.name,
        message: err.message
    })
}

module.exports = errorMiddleware