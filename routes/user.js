var express = require('express');
var router = express.Router();
var user_model = require('../models/user_model.js');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/login', function(req, res, next) {
    if (req.session.user_id) {
        user_model.is_regesterd_user(req.session.user_id, function(success) {
            if (Boolean(success)) {
                console
            }
            else {

            }
        }); 
    }
})

router.post('')

module.exports = router;
