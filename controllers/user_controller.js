/*
 * User Controller
 * Ben Lee
 * 2961102287@qq.com
 */
 
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
        if (err) { //If user is not in database
            res.json({ code: 100,
                        message: "undefined"});
        } 

        if (user) { //If user is in database
            if (user.authenticate(req.body.password)) {
                res.json({code: 0, //Code 0 means everything is fine
                            message: "Authentication Correct"});
            } else {
                res.json({ code: 2, //Error code 2 means email or password error
                            message: "Email or Password error"});
            } 
        }
        else {
            //no such email in database 
            res.json({ code: 2,
                        message: "Email or Password error"});
        }
    });
}

exports.changePassword = function (req, res){
    User.findById({ id: req.body.id}, function (err, user){
        if(err){ //If user not in database
            res.json({ code: 100,
                        message: "undefined"});
        }
        if(user){ //If user is in database
            user.password = req.body.password; // Change password
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

exports.isSuperUser = function (req, res){
    User.findById( { id: req.body.id}, function(err, user){
        //Using userid, we determine if this account has superpowers
        if(err){ //If user is not in database
            res.json({ code: 100,
                        message: "undefined"});
        }
        if(user){ //If user exits in database
            if(user.hasSetSuperUser){ //If user is superuser
                res.json({ code: 0,
                            message: "User is SuperUser"});
            }
            else{
                res.json({ code: 3, //Error Code 3 means Not SuperUser
                            message: "User is not SuperUser"});
            }
        }
    });
}

exports.userRegister = function(req, res){ //Register Function
    User.findOne({ email: req.body.email }, function (err, user) {
        if (!err) { //If user is not in database, means we can add this new user

            var newUser = new User({ email: req.body.email,
                                        password: req.body.password});
            if(typeof req.body.email !== 'string'){
                res.json({ code: 1,
                            message: "邮箱为空"});
            }
            if(typeof req.body.password !== 'string'){
                res.json({ code: 1,
                            message: "密码为空"});
            }
            else{
                newUser.save(); //save user
                res.json({ code: 0,
                            message: "Add new user's email success"});    
            }
        }// end of add new user 
        if (user) { //If user is in database (ergo, user clash)
            res.json({ code: 4, //Error code 4 means existing email or password
                        message: "Email already in use"});
        }
    }); // end of finding email
}// end of user register function

exports.addFolder = function(req, res){ // Add Folder Function
    if(req.body.folderList){ //if we get request to add a folder
        user.addFolder();
        res.json({ code: 0, // Success
                    message: "Add Folder Success"});
    }
    else{ //if something does not exist or something wrong
        res.json({ code: 100,
                    message: "undefined"});
    }
}

exports.getFolderList = function(req, res){ //Get folder list function
    if(exports.isSuperUser){ //if user is superuser
        user.folderList //get all of superuser folder list
        res.json({ code: 0,
                    message: "Get Folder List Success"});
    }
    else{
        if(user.hasSetUser){ //if user is a set user
            user.folderList //get all of set user visible folders
            res.json({ code: 0,
                        message: "Get Folder List Success"});
        }
        else{ // if something goes wrong or does not exist
            res.json({ code: 100, 
                        message: "undefined"});
        }
    }
}