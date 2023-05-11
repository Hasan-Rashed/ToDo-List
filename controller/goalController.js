const getGoals = (req, res) => {
    res.status(200)
    .json({ success: true, data: [{ "id": 1, "name": "Goal 1" }, { "id": 2, "name": "Goal 2" }] })
}

const setGoals = (req, res) => {
    console.log(req.body);
    res.status(200)
    .json({ success: true, message: "Set goal" })
}

const updateGoal = (req, res) => {
    res.status(200)
    .json({ success: true, message: `Update goal ${req.params.id}` })
}

const deleteGoal = (req, res) => {
    res.status(200)
    .json({ success: true, message: `Delete goal ${req.params.id}` })
}


module.exports = {
    getGoals,
    setGoals,
    updateGoal,
    deleteGoal
}