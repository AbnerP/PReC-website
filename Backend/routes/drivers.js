const express = require('express');
const router = express.Router();
const DriversController = require('../controllers/drivers');

//Midlleware
const upload = require('../middleware/multer');
const uploadMiddleware = require('../middleware/multer-gridfs');
const checkAuth = require('../middleware/check-auth');

//GET
router.get('/',DriversController.driversGetAll);
router.get('/:driverId',DriversController.driversGetByID);

//POST
router.post('/', checkAuth, uploadMiddleware,DriversController.driversCreateNew);

//PATCH
router.patch('/:driverId', checkAuth, uploadMiddleware,DriversController.driversUpdate);

//DELETE
router.delete('/:driverId', checkAuth, DriversController.driversDelete);

module.exports = router;