const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')

// @desc   Register a new user
// @route  POST /api/users
// @access Public
const registerUser = asyncHandler(async (req, res) => {
    // destructuring the req.body object to get the name, email, and password 
    const { name, email, password } = req.body;

    // validate user input
    if(!name || !email || !password){
        res.status(400) // 400 = bad request
        throw new Error('Please enter all fields')
    }

    // check if user already exists
    const userExists = await User.findOne({ email })

    if(userExists){
        res.status(400) // 400 = bad request
        throw new Error('User already exists')
    }

    // hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // create a new user
    const user = await User.create({
        name,
        email,
        password: hashedPassword
    })

    if(user){
        res.status(201).json({
            _id: user._id, // brad has uses user.id
            name: user.name,
            email: user.email,
            token: generateToken(user._id) // generate a JWT token, generatedToken is under
    })
    }else {
        res.status(400)
        throw new Error('Invalid user data')
    }
})


// @desc   Authenticate user & get token
// @route  POST /api/users/login
// @access Public
const loginUser = asyncHandler(async (req, res) => {
    // destructuring the req.body object to get the email, and password from the request body
    const { email, password } = req.body;

    // check for user email
    const user = await User.findOne({ email })

    // check if user exists and password is correct with bcrypt compare method
    if(user && (await bcrypt.compare(password, user.password))){
        res.json({
            _id: user._id, // brad has uses user.id
            name: user.name,
            email: user.email,
            token: generateToken(user._id) // generate a JWT token, generatedToken is under
        })
    }else{
        res.status(400)
        throw new Error('Invalid credentials')
    }
})


// @desc   Get user data
// @route  GET /api/users/me
// @access Private
const getMe = asyncHandler(async (req, res) => {
    res.json({
        message: 'user data display'
    })
})


// Generate JWT token
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    })
}


module.exports = {
    registerUser,
    loginUser,
    getMe
}