var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var SALT_WORK_FACTOR = 10;
var Schema  = mongoose.Schema;

var UserSchema   = new Schema({
    name: String,
    lastName: String,
    email: String,
    birthOfdate: Date,
    password: { type: String, required: true },
    images: [{
        path: String,
        URL: String,
    }],
    socialAcoounts: [{
        id: String,
        social: String
    }]
});

UserSchema.pre('save', function(next) {
    var user = this;
    if (!user.isModified('password')) return next();
    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
        if (err) return next(err);
        bcrypt.hash(user.password, salt, function(err, hash) {
            if (err) return next(err);
            user.password = hash;
            next();
        });
    });
});

UserSchema.methods.comparePassword = function(candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    });
};

UserSchema.methods.toJSON = function() {
  var obj = this.toObject();
  delete obj.password;
  return obj;
}

module.exports = mongoose.model('User', UserSchema);
