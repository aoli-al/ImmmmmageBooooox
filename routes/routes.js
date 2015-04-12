var express = require('express');
var router = express.Router();
var userController = require('../controllers/user_controller.js');
var captcha = require('../controllers/captcha.js');

router.get('/', function (req, res){
    console.log('render');
    res.render('index.html');
});


module.exports = router;
