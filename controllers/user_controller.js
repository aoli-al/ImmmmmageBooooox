var mongoose = require('mongoose');
var User = mongoose.model('User');

exports.login = function (req, res) {
    if (typeof req.body.email !== 'string') {
        res.json({ code: 1, // Error code 1 means string error
                    message: "邮箱为空"});
    }

    if (typeof req.body.password !== 'string') {
        res.json({ code: 1, // Error code 1 means string error
                    message: "密码为空" });
    }

    User.findOne({ email: req.body.email }, function (err, user) {
        if (err) {
            res.json({ code: 100,
                        message: "undefined"});
        } 

        if (user) {
            if (user.authenticate(req.body.password)) {
                res.json({code: 0,
                            message: "Authentication Correct"});
            } else {
                res.json({ code: 2, //Error code 2 means email or password error
                            message: "Email or Password error"});
            } 
        }
        else {
            //no such email in my database 
            res.json({ code: 2,
                        message: "Email or Password error"});
        }
    });
}

exports.changePassword = function (req, res){
    User.findById({ id: req.body.id}, function (err, user){
        if(err){
            res.json({ code: 100,
                        message: "undefined"});
        }
        if(user){
            user.password = req.body.password; // changing password
            if(typeof user.password !== 'string'){ // Change password error
                res.json({ code: 1,
                            message: "密码为空"});
            }
            else{ //Change password success
                user.save();
                res.json({ code:0
                            message: "Change Password Complete"});
            }
        }
    });
}

exports.hasSetSuperUser = function (req, res){
    User.findById( { id: req.body.id}, function(err, user){
        //Using userid, we determin if this acc, has superpowers

    })
}