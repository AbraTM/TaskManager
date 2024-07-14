const Task = require('../models/Task')
const asyncWrapper = require('../middleware/async-wrapper')
const { createCustomError } = require('../error/custom-error')

// const getAllTasks = async (req, res) => {
//     try{
//         const allTasks = await Task.find({})
//         res.status(201).json({success: true, data: allTasks})
//     } catch (err) {
//         res.status(500).json({msg: err})
//     }
// }

const getAllTasks = asyncWrapper ( async(req, res) => {
    const allTasks = await Task.find({})
    res.status(201).json( allTasks )
})

// const createTask = async (req, res) => {
//     try{
//         const task = await Task.create(req.body)
//         res.status(201).json({success: true, data: task})
//     } catch (err) {
//         res.status(500).json({msg: "There was an error"})
//     }
// }

const createTask = asyncWrapper ( async (req, res) => {
    const task = await Task.create(req.body)
    res.status(201).json({success: true, data: task})
})

// const deleteTask = async (req, res) => {
//     try {
//         const {id: taskID} = req.params
//         const taskWithID = await Task.findOneAndDelete({_id: taskID})
//         if(!taskWithID){
//             res.status(404).json({msg: `No task with id : ${taskID}`})
//         }
//         res.status(200).json({ taskWithID })
//     } catch (err){
//         res.status(500).json({msg: err})
//     }
// }

const deleteTask = asyncWrapper( async (req, res) => {
    const {id: taskID} = req.params
    const taskWithID = await Task.findOneAndDelete({_id: taskID})
    if(!taskWithID){
        return next(createCustomError(`No task with id : ${taskID}`, 404))
        //return res.status(404).json({msg: `No task with id : ${taskID}`})
    }
    res.status(200).json({ taskWithID })
})

// const getTaskWithId = async (req, res) => {
//     try{
//         const {id: taskID} = req.params
//         const taskWithID = await Task.findOne({ _id : taskID})
//         if(!taskWithID) {
//             return res.status(404).json({msg : `No task with the ID : ${taskID}`})
//         }
//         res.status(200).json({ taskWithID })
//     } catch (err) {
//         res.status(500).json({msg : err})
//     }
// }

const getTaskWithId =asyncWrapper( async (req, res) => {
    const {id: taskID} = req.params
    const taskWithID = await Task.findOne({ _id : taskID})
    if(!taskWithID) {
        return res.status(404).json({msg : `No task with the ID : ${taskID}`})
    }
    res.status(200).json({ taskWithID })
})

// const updateTaskWithId = async (req, res) => {
//     try {
//         const {id: taskID} = req.params
//         const taskWithID = await Task.findByIdAndUpdate({_id : taskID}, req.body, {
//             new: true,
//             runValidators: true
//         })
//         if(!taskWithID){
//            return res.status(404).json({msg : `No task with ID : ${taskID}`})
//         }
//         res.status(200).json({taskWithID})
//     } catch (error) {
//         res.status(500).json({msg: err})
//     }
// }

const updateTaskWithId = asyncWrapper( async (req, res) => {
    const {id: taskID} = req.params
    const taskWithID = await Task.findByIdAndUpdate({_id : taskID}, req.body, {
        new: true,
        runValidators: true
    })
    if(!taskWithID){
       return res.status(404).json({msg : `No task with ID : ${taskID}`})
    }
    res.status(200).json({taskWithID})
})


module.exports = {
    getAllTasks, 
    createTask, 
    deleteTask, 
    getTaskWithId, 
    updateTaskWithId
}