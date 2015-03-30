/*
 * Folder Router
 * Li Ao
 * hi@leeleo.me
 */

var express = require('express');
var router = express.Router();
var folderController = require('../controllers/folder_controller.js');
var userController = require('../controllers/user_controller.js');


router.get('/get_user_list/:fid', userController.sessionVerify, folderController.getUserList);
router.get('/create_folder', userController.supoerUserVerify, folderController.createFolder);


module.exports = router;

