const mongoose = require('mongoose');


const goalSchema = mongoose.Schema({
    // user object will be used to identify the user who created the goal
    // it will allow us to have a user associated with a goal
    user: {
/* `user` field will store a reference to another document in the database, 
specifically a document in the `User` collection. The `ref: 'User' property 
specifies the name of the referenced collection. */
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    text: {
        type: String,
        required: true
    }
})


module.exports = mongoose.model('Goal', goalSchema);