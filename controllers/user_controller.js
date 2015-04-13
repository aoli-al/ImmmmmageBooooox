/*
 * User Controller
 * Ben Lee
 * 2961102287@qq.com
 */

var mongoose = require('mongoose');
var User = mongoose.model('UserModel');
var Folder = mongoose.model('FolderModel');

exports.sessionVerify = function (req, res, next) {
    console.log("verify start");
    if (typeof req.session.uid !== 'string') {
        return res.json({
            code: 4,
            message: "未登录"
        });
    }
    else {
        User.findOne({id: req.session.uid}, function (err, user) {
            if (user) {
                return next();
            }
            return res.json({
                code: 5,
                message: "用户信息校验失败"
            });
        });
    }
}

exports.superUserVerify = function (req, res, next) {
    if (typeof req.session.uid !== 'string') {
        return res.json({
            code: 4,
            message: "未登录"
        });
    }
    else {
        User.findOne({id: req.session.uid}, function (err, user) {
            if (user.isSuperUser === 1) {
                return next();
            }
            return res.json({
                code: 5, 
                message: "用户信息校验失败"
            });
        });
    }
}

exports.login = function (req, res) {
    if (typeof req.body.email !== 'string') {
        return res.json({
            code: 1, // Error code 1 means string error
            message: "邮箱为空"
        });
    }
    if (typeof req.body.password !== 'string') {
        return res.json({
            code: 1, // Error code 1 means string error
            message: "密码为空"
        });
    }

    User.findOne({ email: req.body.email }, function (err, user) {
        if (err) { //If user is not in database
            return res.json({
                code: 100,
                message: "undefined"
            });
        } 

        if (user) { //If user is in database
            if (user.authenticate(req.body.password)) {
                req.session.uid = user._id;
                console.log(user);
                console.log(req.session);
                return res.json({
                    code: 0, //Code 0 means everything is fine
                    message: "Authentication Correct"
                });
            } else {
                return res.json({
                    code: 2, //Error code 2 means email or password error
                    message: "Email or Password error"
                });
            } 
        }
        else {
            //no such email in database 
            return res.json({
                code: 2,
                message: "Email or Password error"
            });
        }
    });
}

exports.changePassword = function (req, res){
    if(typeof user.password !== 'string'){ // Change password error
        return res.json({
            code: 1,
            message: "密码为空"
        });
    }
    User.findById({ id: req.session.uid}, function (err, user){
        if(err){ //If user not in database
            return res.json({
                code: 100,
                message: "undefined"
            });
        }
        if(user){ //If user is in database
            user.password = req.body.password; // Change password
            user.save();
            return res.json({
                code:0,
                message: "Change Password Complete"
            });
        }
    });
}

exports.isSuperUser = function (req, res){
    User.findById( { _id: req.session.uid }, function(err, user){
        //Using userid, we determine if this account has superpowers
        console.log(req.session);
        if(err){ //If user is not in database
            console.log(err);
            return res.json({
                code: 100,
                message: "undefined"
            });
        }
        if(user){ //If user exits in database
            if(user.isSuperUser === 1){ //If user is superuser
                return res.json({
                    code: 0,
                    message: "User is SuperUser"
                });
            }
            else{
                return res.json({
                    code: 3, //Error Code 3 means Not SuperUser
                    message: "User is not SuperUser"
                });
            }
        }
    });
}

exports.hasSetSuperUser = function(req, res, next){
    User.hasSetSuperUser(function (err, check) {
        if(err){
            return res.json({
                code: 100,
                message: "undefined"
            });
        }
        if(check){
            next();
        }
        else{
            return res.json({
                code: 101, //Error code 3 means Not super user
                message: "Not Superuser"
            });
        }
    });
}


exports.register = function(req, res){ //Register Function
    if(typeof req.body.email !== 'string'){
        return res.json({
            code: 1,
            message: "邮箱为空"
        });
    }
    if(typeof req.body.password !== 'string'){
        return res.json({
            code: 1,
            message: "密码为空"
        });
    }
    if (req.body.passwordVerify !== req.body.password){
        return res.json({
            code: 6,
            message: "Verify password not identical to password"
        });
    }
    User.findOne({ email: req.body.email }, function (err, user) {
        if (user) { //If user is in database (ergo, user clash)
            return res.json({
                code: 4, //Error code 4 means existing email or password
                message: "Email already in use"
            });
        }
        if (!err) { //If user is not in database, means we can add this new user
            var newUser = new User({ email: req.body.email,
                password: req.body.password});
            User.hasSetSuperUser(function (err, check){
                if(check){ //Means user is normal user
                    newUser.isSuperUser = 0;
                }
                else{ //Means user is Super user
                    newUser.isSuperUser = 1;
                }
                newUser.save();
                req.session.uid = newUser._id; //save user  
                return res.json({
                    code: 0,
                    message: "Add new user's email success"
                });    
            });
        }// end of add new user 
    }); // end of findOne (finding email)
}// end of user register function

exports.addFolder = function(req, res){ // Add Folder Function
    if (req.body.folderList.constructor !== Array) {
        return req.json({
            code: 1,
            message: "List is empty"
        }); 
    }
    User.findOne({ id: req.body.uid }, function (err, user) {
        if (err) {
            return res.json({ 
                code: 100,
                message: "undefined"
            });
        } 
        if (user) {
            var error = null;
            for (var folder in req.body.folderList) {
                Folder.findOne({ 'id': folder}, function (err, folder) {
                    if (err) {
                        return res.json({
                            code: 100,
                            message: "undefined" 
                        });
                    }
                    if (folder) {
                        user.addFolder(folder, function (err) {
                            if (err) {
                                console.log (err.message);
                                error = err;
                            }
                        });
                        folder.addUser(user, function (err) {
                            if (err) {
                                console.log (err.message);
                                error = err;
                            }
                        });
                    }
                });
            }
            if (!error) {
                return res.json({
                    code: 0,
                    message: "Add folder Success"
                });
            }
            else {
                return res.json({
                    code: 100,
                    message: "undefined"
                });
            }
        }
    });
}

exports.logout = function (req, res) {
    req.session.destroy(function (err) {
        if (!err) {
            return res.json({
                code: 0,
                message: "Logout Success"
            });
        }
    });
}

exports.getFolderList = function(req, res) { //Get folder list function
    User.findOne({ id: req.session.uid }, function(err, user) {
        if (err) {
            return res.json({
                code: 100,
                message: "undefined"
            });
        }
        if (!user) {
            return res.json({
                code: 100,
                message: "undefined"
            });
        }
        return res.json({
            code: 0,
            message: "Get folder Success",
            data: {
                folderList: user.folderList
            }
        });
    });
}

