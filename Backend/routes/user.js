const express = require('express');
const router = express.Router();
const UserController = require('../controllers/user');

//Middleware
const checkAuth = require('../middleware/check-auth');

//GET
router.get('/',checkAuth,UserController.getAllUsers);

//POST
router.post('/signup',UserController.signup);
router.post('/login', UserController.login);

//DELETE
router.delete('/:userId',UserController.delete);

module.exports = router;