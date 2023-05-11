const asyncHandler = require('express-async-handler'); 
const Goal = require('../model/goalModel');


// using express-async-handler to handle errors instead of try catch blocks
const getGoals = asyncHandler(async (req, res) => {
    const goals = await Goal.find();
    
    res.status(200)
    .json(goals)
})

// using express-async-handler to handle errors instead of try catch blocks
const setGoals = asyncHandler(async (req, res) => {
    if(!req.body.text){
        res.status(400)
        throw new Error('Please add a text field')
    }
    
    res.status(200)
    .json({ success: true, message: "Set goal" })
})

// using express-async-handler to handle errors instead of try catch blocks
const updateGoal = asyncHandler(async (req, res) => {
    res.status(200)
    .json({ success: true, message: `Update goal ${req.params.id}` })
})

// using express-async-handler to handle errors instead of try catch blocks
const deleteGoal = asyncHandler(async (req, res) => {
    res.status(200)
    .json({ success: true, message: `Delete goal ${req.params.id}` })
})


module.exports = {
    getGoals,
    setGoals,
    updateGoal,
    deleteGoal
}