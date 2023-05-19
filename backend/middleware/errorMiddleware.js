// to override the default error handler of express
const errorHandler = (err, req, res, next) => {
    // statusCode is the code of goalController.js which is 400 or 500
    const statusCode = res.statusCode ? res.statusCode : 500;

    res.status(statusCode)
    .json({
        message: err.message
    })
}


module.exports = {
    errorHandler
}