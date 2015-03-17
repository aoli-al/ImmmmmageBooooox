var express = require('express');
var router = express.Router();
var User = mongoose.model('User');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/login', function(req, res) {
    if (req.session.user_id) {

        user_model.is_regesterd_user(req.session.user_id, function(success) {
            if (Boolean(success)) {
            }
            else {

            }
        }); 
    }
});


module.exports = router;
