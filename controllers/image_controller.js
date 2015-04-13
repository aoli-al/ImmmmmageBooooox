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
    Image.findOne({id: req.params.iid}, function (err, image) {
        if (image) {
            image.populate('relatedFolder')
                .exec(function (err, folder) {
                    folder.hasPrivicy(req.session.uid, function (check) {
                        if (check) {
                            fs.readFile(image.path, function(err, squid){
                                if (err) {
                                    return ;
                                }
                                res.send(squid);
                            });
                        }
                    });   
                });
        }
    });
}

exports.uploadImage = function (req, res) {
    Folder.findOne( {id: req.body.fid }, function(err, folder) {
        if (err) {
            return ;
        }
        if (!folder) {
            return ;
        }
        var file = req.files.file;
        var path = './images/'; 
        var buffer = file.buffer;
        var fileName = file.name;
        var stream = fs.createWriteStream(path + fileName);
        stream.wire(buffer);
        stream.on('error', function(err){
            res.json({
                code: 100,
                message: "undefined"
            });
        });
        stream.on('finish', function() {
            var image = new Image({
                path: path+name,
                relatedFolder: req.body.fid 
            }); 
            image.save();
            res.json({
                code:0,
                message:"Image save Success"
            });
        });

    });
}
