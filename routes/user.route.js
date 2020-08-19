const express = require('express')
const UserController = require('../controllers/user.controller')
const router = express.Router()

router.post('/user', UserController.RegisterUser)
router.get('/users', UserController.GetAllUsers)
router.get('/users/:user_type', UserController.GetUserByType)
router.get('/user/:_id', UserController.GetUserById)
router.put('/user/:_id', UserController.UpdateUser)
router.delete('/user/:_id', UserController.DeleteUser)
router.get('/user/:user_id/organizations', UserController.GetOrganizationsByUser)
router.post('/user/login', UserController.Login)
router.post('/user/logout', UserController.Logout)

module.exports = router

