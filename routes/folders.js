/*
 * Folder Router
 * Li Ao
 * hi@leeleo.me
 */

var express = require('express');
var router = express.Router();
var folderController = require('../controllers/folder_controller.js');
var userController = require('../controllers/user_controller.js');


router.get('/user_list/:fid', userController.sessionVerify, folderController.getUserList);
router.post('/create_folder', userController.superUserVerify, folderController.createFolder);
router.get('/image_list/:fid', userController.sessionVerify, folderController.getImageList);
// router.post('/create_folder', folderController.createFolder);
router.post('/delete', userController.superUserVerify, folderController.deleteFolder);
router.post('/change_name', userController.superUserVerify, folderController.modifyFolderName);

module.exports = router;

