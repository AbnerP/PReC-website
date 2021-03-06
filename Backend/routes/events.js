const express = require('express');
const router = express.Router();
const EventsController = require('../controllers/events');

//Middleware
const uploadMiddleware = require('../middleware/multer-gridfs');
const checkAuth = require('../middleware/check-auth');
const checkPersonalAdmin = require('../middleware/check-personal-admin');
const removeOldEvents = require('../middleware/events');

router.use(removeOldEvents);

//GET
router.get('/', EventsController.eventsGetAll);
router.get('/:eventId',EventsController.eventsGetByID);
router.get('/users/:eventId',EventsController.getRegisteredUsers);

//POST
router.post('/', checkAuth, uploadMiddleware, EventsController.eventsCreate);

//PATCH
router.patch('/:eventId', checkAuth, uploadMiddleware,EventsController.eventsUpdate);
router.patch('/register/:userId', checkPersonalAdmin, EventsController.registerUserToEvent);
router.patch('/withdraw/:userId', checkPersonalAdmin, EventsController.withdrawUserFromEvent);

//DELETE
router.delete('/:eventId', checkAuth,EventsController.eventsDelete);

//Image

module.exports = router;