const express = require('express');
const router = express.Router();
const UserController = require('../controllers/user');

//Middleware
const checkAuth = require('../middleware/check-auth');
const checkPersonalAdmin = require('../middleware/check-personal-admin');

//GET
router.get('/',checkAuth,UserController.getAllUsers);
router.get('/:userId',checkPersonalAdmin,UserController.getUserByID)
//POST
router.post('/signup',UserController.signup);
router.post('/login', UserController.login);
router.post('/makeAdmin/:userId',checkAuth,UserController.makeAdmin);

//PATCH
router.patch('/update/:userId',checkPersonalAdmin,UserController.updateUser)

//DELETE
router.delete('/:userId', checkAuth, UserController.delete);

//Mailinglist
router.post("/subscribe",UserController.subscribeAllUsers);

module.exports = router;