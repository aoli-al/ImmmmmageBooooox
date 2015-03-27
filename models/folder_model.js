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
    userList: [ {type:Schema.ObjectId, ref: 'UserModel' }]
})


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
            })
    },

    addImage: function (image, callback) {
        this.populcate({
            path: 'imageList',
            match: { id: image.id },
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
        })
    }
}

folderSchema.statics = {

  userList: function (_id, cb) {
    var query = this.where({ id: _id });
    query.find
  }
}

mongoose.model('FolderModel', folderSchema);
