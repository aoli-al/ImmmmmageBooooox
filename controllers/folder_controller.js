/*
 * Folder Controller
 * Li Ao
 * hi@leeleo.me
 */

var mongoose = require('mongoose');
var Folder = mongoose.model('FolderModel');
var User = mongoose.model('UserModel');

exports.get_user_list = function (req, res) {
    if (typeof req.body.id !== 'string') {
        // handle error
    }
    Folder
        .findById(req.body.id, 'userList')
        .exec(function (err, lists) {
            // handle err
            res.json({code: 0,
                message: "",
                data: lists});
        });
}

exports.get_folder_list = function (req, res) {
    if (typeof req.body.id !== 'string')
}
