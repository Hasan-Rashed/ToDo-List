const asyncHandler = require('express-async-handler'); 
const Goal = require('../models/goalModel');
const User = require('../models/userModel');


// @desc Get goals
// @route GET /api/goals
// @access Private
// using express-async-handler to handle errors instead of try catch blocks
const getGoals = asyncHandler(async (req, res) => {
    const goals = await Goal.find({ user: req.user.id }); // user field on goal relationship to User model
    
    res.status(200)
    .json(goals)
})

// using express-async-handler to handle errors instead of try catch blocks
const setGoals = asyncHandler(async (req, res) => {
    if(!req.body.text){
        res.status(400)
        throw new Error('Please add a text field')
    }

    const goal = await Goal.create({
        text: req.body.text,
        /* `user: req.user.id` is setting the `user` field of a `Goal` document to the `id`
        of the currently authenticated user making the request. This is used to
        establish a relationship between the `Goal` model and the `User` model, allowing
        for querying and filtering of goals by user. */
        user: req.user.id // user field on goal relationship to User model to create goal
    })
    
    res.status(200)
    .json(goal)
})

// using express-async-handler to handle errors instead of try catch blocks
const updateGoal = asyncHandler(async (req, res) => {
    // find the id of the goal by req.params.id
    const goal = await Goal.findById(req.params.id);

    if(!goal){
        res.status(400)
        throw new Error('Goal not found')
    }


    const user = await User.findById(req.user.id); // req.user.id is the id of the currently authenticated user making the request

    // check for user
    if(!user){
        res.status(401) // 401 is unauthorized
        throw new Error('User not found')
    }

    // make sure the logged in user matches the goal user
    if(goal.user.toString() !== user.id){
        res.status(401) // 401 is unauthorized
        throw new Error('User not authorized')
    }
    

    const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, {new: true})

    res.status(200)
    .json({ success: true, updatedGoal })
})

// using express-async-handler to handle errors instead of try catch blocks
const deleteGoal = asyncHandler(async (req, res) => {

    // find the id of the goal by req.params.id
    const goal = await Goal.findById(req.params.id);

    if(!goal){
        res.status(400)
        throw new Error('Goal not found')
    }

    // delete the goal by req.params.id from the database
    await goal.deleteOne({id: req.params.id});
    
    res.status(200)
    .json({ success: true, id: req.params.id })
})


module.exports = {
    getGoals,
    setGoals,
    updateGoal,
    deleteGoal
}