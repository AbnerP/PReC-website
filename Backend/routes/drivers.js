const express = require('express');
const router = express.Router();
const DriversController = require('../controllers/drivers');

//Midlleware
const upload = require('../middleware/multer');
const checkAuth = require('../middleware/check-auth');

//GET
router.get('/',DriversController.driversGetAll);
router.get('/:driverId',DriversController.driversGetByID);

//POST
router.post('/', checkAuth, upload.single('driverImage'),DriversController.driversCreateNew);

//PATCH
router.patch('/:driverId', checkAuth, upload.single('driverImage'),DriversController.driversUpdate);

//DELETE
router.delete('/:driverId', checkAuth, DriversController.driversDelete);

module.exports = router;