const express = require('express')
const UserController = require('../controllers/user.controller')
const router = express.Router()

router.post('/user', UserController.AddUser)
router.get('/users', UserController.GetAllUsers)
router.get('/user/:_id', UserController.GetUserById)
router.put('/user/:_id', UserController.UpdateUser)
router.delete('/user/:_id', UserController.DeleteUser)

module.exports = router

