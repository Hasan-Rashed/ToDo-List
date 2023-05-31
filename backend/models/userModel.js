const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name: { 
        type: String, 
        required: [true, 'Please enter your name'], 
    },
    email: { 
        type: String, 
        require: [true, 'Please enter your email'], 
        unique: true, 
    },
    password: { 
        type: String, 
        required: [true, 'Please enter your password'], 
    },
    // isAdmin: { type: Boolean, default: false, required: true }, // to check if the user is admin or not
},
{
    timestamps: true, // to get the time of creation and update of the user automatically
}
);

module.exports = mongoose.model('User', userSchema); // exporting the model