/*
 * Folder Controller
 * Li Ao
 * hi@leeleo.me
 */

var mongoose = require('mongoose');
var Folder = mongoose.model('FolderModel');
var User = mongoose.model('UserModel');

exports.getUserList = function (req, res) {
    if (typeof req.body.id !== 'string') {
        return res.json({ 
            code: 1,
            message: "字段不得为空" 
        });
    }
    Folder
        .findById(req.body.id, 'userList')
        .exec(function (err, lists) {
            if (err) {
                console.log(err.message);
                return res.json({
                    code:100,
                    mssage: "未知错误", 
                });
            }
            res.json({code: 0,
                message: "",
                data: lists});
        });
}

// TODO Add addUser function
