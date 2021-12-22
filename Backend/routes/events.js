const express = require('express');
const router = express.Router();
const EventsController = require('../controllers/events');

//Middleware
const upload = require('../middleware/multer');
const checkAuth = require('../middleware/check-auth');
const removeOldEvents = require('../middleware/events');
router.use(removeOldEvents);

//GET
router.get('/', EventsController.eventsGetAll);
router.get('/:eventId',EventsController.eventsGetByID);

//POST
router.post('/', checkAuth, upload.single('eventImage'), EventsController.eventsCreate);

//PATCH
router.patch('/:eventId', checkAuth, upload.single('eventImage'),EventsController.eventsUpdate);

//DELETE
router.delete('/:eventId', checkAuth,EventsController.eventsDelete);

module.exports = router;