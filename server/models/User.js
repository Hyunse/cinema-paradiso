const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');
const Schema = mongoose.Schema;

// Define Model
const userSchema = new Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
  },
});

userSchema.pre('save', function (next) {
  // Before save
  const user = this;

  // Password Encoding
  bcrypt.genSalt(10, function (err, salt) {
    if (err) return next(err);

    bcrypt.hash(user.password, salt, null, function (err, hash) {
      if (err) return next(err);

      user.password = hash;
      next();
    });
  });
});

userSchema.methods.comparePassword = function (comparedPassword, callback) {
  bcrypt.compare(comparedPassword, this.password, (err, isMatch) => {
    if (err) return callback(err);

    callback(null, isMatch);
  });
};

// Create Model Class
const ModelClass = mongoose.model('user', userSchema);

module.exports = ModelClass;
