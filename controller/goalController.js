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

    const goal = await Goal.create({
        text: req.body.text
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