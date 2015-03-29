/*
 * Image Controller
 *
 *
 */

var mongoose = require('mongoose');
var Folder = mongoose.model('FolderModel');
var Image = mongoose.model('ImageModel');
var Canvas = require('canvas');
var fs require('fs');

exports.getImage = function (req, res) {
    if (typeof req.body.iid !== 'string') {
        return res.json({
            code: 1,

        });
    }
    else {
        Image.findOne({id: req.body.iid}, function (err, image)) {
            if (image) {
                image.populate('relatedFolder')
                    .exec(function (err, folder) {
                        folder.hasPrivicy(req.session.uid, function (check) {
                            if (check) {
                                fs.readFile(__dirname + '/images/' + image.path, function(err, squid){
                                    if (err) {
                                        return ;
                                    }
                                    res.send(squid);
                                });
                            }
                        });   
                    });
            }
        }
    }
}

export.uploadImage
