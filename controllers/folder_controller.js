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
                    message: "未知错误" 
                });
            }
            res.json({code: 0,
                message: "Get User List Success",
                data: lists});
        });
}

exports.getFolderInfo = function (req, res) {
    if (typeof req.params.fid !== 'string') {
        return res.json({
            code: 1,
            message:"Empty input"
        });
    }
    Folder.findById(req.params.fid, 'name parentFolder')
        .exec(function (err, folder) {
            if (err) {
                console.log(err);
                return res.json({
                    code: 100,
                    message: "未知错误"
                });
            }
            return res.json({
                code: 0,
                message: "",
                data: {
                    name: folder.name,
                    parentFolder: folder.parentFolder
                }
            });
        });
}

exports.deleteFolder = function (req, res) {
    if (typeof req.body.fid !== 'string') {
        return res.json({
            code: 1,
            message: "String Error, Empty input or something"
        });
    }
    Folder.findById(req.body.fid, function(err, folder){
        if (err) {
            console.log(err);
            return res.json({
                code: 100,
                message: "未知错误"
            });
        }
        if (folder) {
            folder.remove();
            return res.json({
                code: 0,
                message: 'success'
            });
        }
        else {
            return res.json({
                code: 5,
                message: '木有文件夹'
            });
        }
    });
}

exports.modifyFolderName = function (req, res) {
    if (typeof req.body.fid !== 'string' || typeof req.body.name !== 'string') {
        return res.json({
            code: 1,
            message: ""
        });
    }
    Folder.findById(req.body.fid)
        .exec(function (err, folder){
            if (err) {
                console.log(err);
                return res.json({
                    code: 100,
                    message: "未知错误"
                });
            }
            folder.name = req.body.name;
            folder.save();
            return res.json({

            });
        });
}

exports.createFolder = function (req, res) {
    if (typeof req.body.name !== 'string') {
        return res.json({
            code: 1,
            message: "String Error, Empty input or something"
        });
    }
    if (typeof req.body.parentFolderId !== 'string') {
        return res.json({
            code: 1,
            message: "String Error, Empty input or something"
        });
    }
    if (req.body.parentFolderId === "#") {
        var newFolder = new Folder({
            name: req.body.name,
            userList: [req.cookies.uid]
        });
        console.log(req.cookies);
        newFolder.save();
        res.json({
            code: 0,
            message: "Create folder success"
        });
    }
    else {
        Folder.findById(req.body.parentFolderId, '_id')
            .exec(function (err, id) {
                if (err) {
                    console.log(err);
                    return res.json({
                        code: 100,
                        message: "未知错误"
                    });
                }
                var newFolder = new Folder({
                    name: req.body.name,
                    userList: [req.cookies.uid],
                    parentFolder: id,
                });
                console.log(newFolder);
                console.log(req.cookies);
                newFolder.save();
                res.json({
                    code: 0,
                    message: "Create folder success",
                    data:{
                        fid: newFolder._id,
                    }
                });
            });
    }
}

exports.getImageList = function (req, res) {
    if (typeof req.params.fid !== 'string') {
        return res.json({
            code: 1,
            message: "String Error, Empty input or something"
        });
    }
    Folder
        .findById(req.params.fid, 'imageList')
        .exec(function (err, lists) {
            if (err) {
                console.log(err);
                return res.json({
                    code: 100,
                    message: "未知错误"
                });
            }
            return res.json({
                code: 0,
                message: "Get Image List Success",
                data: lists
            });
        });
}

// TODO Add addUser function
