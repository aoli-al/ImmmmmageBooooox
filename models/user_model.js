var mongoose = require('mongoose');
var passwordHash = require('password-hash');

var userSchema = new mongoose.Schema({
    email: { type: String, default: '' },
    hashedPassword: { type: String, default: '' },
    isSuperUser: { type: Number, default: 0 },
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

userSchema.path('email').required(true, '邮箱不能为空哦');

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
    },
};

userSchema.statics = {
    hasSetSuperUser: function(callback) {
        this.findOne({ 'isSuperUser': 1 })
            .select('email')
            .exec(function(err, user) {
                if (err) return callback(err, null);
                if (!user) return callback(null, false);
                return callback(null, true);
            });
    },
    hasSetUser: function(email, callback) {
        this.findOne({'email': email})
            .select('email')
            .exec(function(err, user) {
                if (err) return callback(err, null);
                if (!user) callback(null, false);
                return callback(null, true);
            });
    }
};

mongoose.model('User', userSchema);

