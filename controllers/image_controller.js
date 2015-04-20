/*
 * Image Controller
 *
 *
 */

var mongoose = require('mongoose');
var Folder = mongoose.model('FolderModel');
var Image = mongoose.model('ImageModel');
var Canvas = require('canvas');
var fs = require('fs');

exports.getImage = function (req, res) {
    if (typeof req.params.iid !== 'string') {
        return res.json({
            code: 1,
            message: "String error, empty input or something"
        });
    }
    Image.findOne({_id: req.params.iid})
        .populate("relatedFolder")
        .exec(function(err, image) {
            if (!image) {
                return res.json({
                    code: 100,
                    message: ""
                });
            }
            console.log(image);
            image.relatedFolder.hasPrivicy(req.cookies.uid, function (er, check) {
                if (check) {
                    fs.readFile(image.path, function(err, squid){
                        if (err) {
                            return res.json({
                                code:100
                            });
                        }
                        return res.send(squid);
                    });
                } else {
                    return res.json({
                        code: 3
                    });
                }
            });   
        });
}

exports.uploadImage = function (req, res) {
    if (typeof req.body.fid !== 'string') {
        return res.json({
            code: 1,
        });
    }
    console.log("开始上传啦");
    console.log(req.body.fid);
    Folder.findOne( {_id: req.body.fid }, function(err, folder) {
        if (err) {
            console.log(err);
            return res.json({
                code: 100
            });
        }
        if (!folder) {
            console.log("图片不存在");
            return res.json({
                code: 2
            });
        }
        console.log(req.files)
        var file = req.files.file;
        var image = new Image({
            path: file.path,
            relatedFolder: req.body.fid 
        }); 
        image.save();
        folder.imageList.push(image._id);
        console.log(folder);
        folder.save();
        res.json({
            code:0,
            message:"Image save Success"
        });

    });
}
