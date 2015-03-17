var mongoose = require('mongoose');
var passwordHash = require('password-hash');

var userSchema = new mongoose.Schema({
    email: { type: String, default: '' },
    hashedPassword: { type: String, default: '' },
    isSuperUser: { type: String, default: 0 },
    folderList: [{ type:Schema.ObjectId, ref: 'Folder' }],
});

userSchema
    .virtual('password')
    .set(function(password) {
        this.pwd = password;
        this.hashedPassword = passwordHash.generate(password);
    }) 
    .get(function() {
        return this.pwd; 
    });

userSchema.path('email').validate(function (email) {
    return email.length;
});

userSchema.path('email').validate(function (email, fn) {
    var User = mongoose.model('User');
    if (this.isNew || this.isModified('email')) {
        User.find({email: email}).exec(function (err, users) {
            fn(!err && users.length === 0);
        });
    }
}, '邮箱已被注册');

userSchema.pre('save', function(next) {
    if (!this.isNew) return next();

    if (!(this.password && this.password.length)) {
        next(new Error('未填写密码'))
    } 
    else {
        next();
    }
});

userSchema.methods =  {
    authenticate: function(plainText) {
        return passwordHash.verify(plainText, self.hashedPassword);
    }
};

mongoose.model('User', userSchema);

