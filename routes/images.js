var express = require('express');
var router = express.Router();
var userController = require('../controllers/user_controller.js');
var imageController = require('../controllers/image_controller.js');

/* GET home page. */
router.get('/get_image/:iid', userController.sessionVerify, imageController.getImage);
router.post('/upload_image', userController.superUserVerify, imageController.uploadImage);
router.post('/change_location', userController.superUserVerify, imageController.changeLocation);
router.post('/delete', userController.superUserVerify, imageController.changeLocation);

module.exports = router;
