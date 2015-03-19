var mongoose = require('mongoose');
var User = mongoose.model('User');

exports.create = function (req, res) {
    User.hasSetUser(req.body.user)
}
