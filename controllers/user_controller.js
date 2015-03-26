var mongoose = require('mongoose');
var User = mongoose.model('User');

exports.login = function (req, res) {
    if (typeof req.body.email !== 'string') {
        res.json({ code: 1,
                   message: "邮箱为空"});
    }

    if (typeof req.body.password !== 'string') {
        // error handler
    }
    
    User.findOne({ email: req.body.email }, function (err, user) {
        if (err) {
            //
        } 

        if (user) {
            if (user.authenticate(req.body.password)) {
                res.json({code: 0})
            } else {
                res. 
            } 
        }
        else {
            //no such email in my database 
        }
    })

}
