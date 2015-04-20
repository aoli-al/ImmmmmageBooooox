/*
 * Folder Model
 * Li Ao
 * hi@leeleo.me
 */

var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var folderSchema = new mongoose.Schema({
    id: Schema.ObjectId,
    name: { type: String, required: true },
    parentFolder: { type: Schema.ObjectId, ref: 'FolderModel'},
    imageList: [{ type: Schema.ObjectId, ref: 'ImageModel' }],
    userList: [ {type:Schema.ObjectId, ref: 'UserModel' }],
});

folderSchema.pre('remove', function(next){
    var Image = mongoose.model('UserModel');
    var Folder = mongoose.model('FolderModel');
    console.log(this._id);
    Image.find({relatedFolder: this._id}, function(err, images) {
        for (var image in images) {
            image.remove();
        }
    });
    Folder.find({parentFolder: this._id}, function(err, folders) {
        for (var folder in folders) {
            folder.remove();
        }
    });
    next();
});


folderSchema.methods = {

    addUser: function (uid, callback) {
        this.populate({
                path: 'userList',
                match: { id: uid },
                select: 'email'
            })
            .exec(function(err, users) {
                if (err) return callback(err);
                if (!users || (users.size() === 0)) {
                    this.userList.push(user); 
                    this.save(callback);
                } 
                else {
                    callback(new Error("用户已存在")); 
                }
            });
    },

    addImage: function (imageId, callback) {
        this.populate({
            path: 'imageList',
            match: { id: imageId },
            select: 'id'
        })
        .exec(function (err, images) {
            if (err) return callback(err); 
            if (!images || (images.size() === 0)) {
                this.imageList.push(image);
                this.save(callback);
            }
            else {
                callback(new Error("图片已存在")); 
            }
        });
    },

    hasPrivicy: function (userId, callback) {
        if (this.userList.indexOf(userId) > -1) {
            callback(null, true)
        }
        else {
            callback(null, false)
        }
    }
}

mongoose.model('FolderModel', folderSchema);
