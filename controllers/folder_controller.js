/*
 * Folder Controller
 * Li Ao
 * hi@leeleo.me
 */

var mongoose = require('mongoose');
var Folder = mongoose.model('FolderModel');
var User = mongoose.model('UserModel');

exports.getUserList = function (req, res) {
    if (typeof req.params.fid !== 'string') {
        return res.json({ 
            code: 1,
            message: "字段不得为空" 
        });
    }
    Folder
        .findById(req.params.fid, 'userList')
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

exports.createFolder = function (req, res) {
    if (typeof req.body.name !== 'string') {
        return res.json({
            code: 1
        });
        var newFolder = new Folder({
            name: req.body.name
        });
        newFolder.save();
        res.json({
            code: 0
        });
    }

}

// TODO Add addUser function
