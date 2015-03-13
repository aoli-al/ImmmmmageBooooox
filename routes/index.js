var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/adsfasd', function(req, res) {
    var db = req.db;

});

module.exports = router;
