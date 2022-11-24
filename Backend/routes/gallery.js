const express = require('express');
const router = express.Router();
const GalleryController = require('../controllers/image');

//Midlleware
const uploadMiddleware = require('../middleware/multer-gridfs');
const checkAuth = require('../middleware/check-auth');

//GET
router.get('/',GalleryController.getAllIds);

//POST
router.post('/', uploadMiddleware,GalleryController.imageCreateNew);

//DELETE
router.delete('/:imageId', GalleryController.imageDelete);

module.exports = router;