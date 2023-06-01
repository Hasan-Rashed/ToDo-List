const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')

const protect = asyncHandler(async (req, res, next) => {
    let token

    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        try {
            // Get token from header
            token = req.headers.authorization.split(' ')[1]

            // verify token
            const decoded = jwt.verify(token, process.env.JWT_SECRET)

            // Get user from the token
            // token has the user id as payload
            /* `req.user = await User.findById(decoded.id).select('-password')` is retrieving
            the user information from the database based on the user id that is stored in
            the decoded JWT token. The `.select('-password')` part is excluding the password
            field from the returned user object, for security reasons. The retrieved user
            object is then assigned to the `req.user` property, which can be used in
            subsequent middleware or route handlers to access the authenticated user's
            information. */
            req.user = await User.findById(decoded.id).select('-password')  

            next()
        } catch (error) {
            console.log(error);
            res.status(401) // 401 = unauthorized
            throw new Error('Not authorized, token failed')
        }
    }

    if(!token){
        res.status(401) // 401 = unauthorized
        throw new Error('Not authorized, no token')
    }
})

module.exports = { protect }