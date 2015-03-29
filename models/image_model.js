/*
 * Image Model
 * 
 * 
 */

var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var imageSchema = new mongoose.Schema({
    id: Schema.ObjectId,
    path: String,
    relatedFolder: {type:Schema.ObjectId, ref:'FolderModel'}
});

userSchema.path('path').validate(function (_path, fn){
    var Image = mongoose.model('ImageModel');
    if (this.isNew || this.isModified('path')) {
        Image.find({path: _path}).exec(function (err, images){
            fn(!err && images.length === 0); 
        });
    }
}, "路径重复");

mongoose.model('ImageModel', imageSchema);
