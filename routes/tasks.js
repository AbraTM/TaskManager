const express = require('express');
const router = express.Router();

const { getAllTasks, createTask, deleteTask, getTaskWithId, updateTaskWithId } = require('../controllers/tasks-controller')

router.get('/', getAllTasks)

router.post('/', createTask)

router.get('/:id', getTaskWithId)

router.patch('/:id', updateTaskWithId)

router.delete('/:id', deleteTask)

module.exports = router