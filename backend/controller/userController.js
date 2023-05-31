// @desc   Register a new user
// @route  POST /api/users
// @access Public
const registerUser = (req, res) => {
    res.json({
        message: 'Your account has been registered!'
    })
}


// @desc   Authenticate user & get token
// @route  POST /api/users/login
// @access Public
const loginUser = (req, res) => {
    res.json({
        message: 'You are logged in!'
    })
}


// @desc   Get user data
// @route  GET /api/users/me
// @access Public
const getMe = (req, res) => {
    res.json({
        message: 'user data display'
    })
}


module.exports = {
    registerUser,
    loginUser,
    getMe
}