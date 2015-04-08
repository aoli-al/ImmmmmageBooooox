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
    imageList: [{ type: Schema.ObjectId, ref: 'ImageModel' }],
    userList: [ {type:Schema.ObjectId, ref: 'UserModel' }],
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
                    this.push(user); 
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
                this.push(image);
                this.save(callback);
            }
            else {
                callback(new Error("图片已存在")); 
            }
        });
    },

    hasPrivicy: function (userId, callback) {
        this.populate({
            path: 'userList',
            match: { id: userId },
            select: 'id'
        })
        .exec(function (err, users) {
            if (err) return callback(false);
            if (!users || (users.size() === 0)) {
               return callback(false);
            }
            return callback(true);
        });
    }
}

mongoose.model('FolderModel', folderSchema);
