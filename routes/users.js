var express = require('express');
var router = express.Router();
var userController = require('../controllers/user_controller.js');
var captcha = require('../controllers/captcha.js');

router.post('/login', captcha.check, userController.login);
router.post('/register', captcha.check, userController.register);
router.post('/add_folder', userController.superUserVerify, userController.addFolder);
router.post('/change_password', userController.sessionVerify, userController.changePassword);
router.get('/is_superuser', userController.isSuperUser);
// router.get('/is_superuser',  userController.sessionVerify, userController.isSuperUser);
router.get('/folder_list', userController.sessionVerify, userController.getFolderList);

module.exports = router;
