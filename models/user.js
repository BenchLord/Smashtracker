var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

var emailValidator = (value) => {
  return /^\S+@\S+[.]\S+$/.test(value);
}

var UserSchema = new mongoose.Schema({
  email: {
    type: String,
    validate: {
      validator: emailValidator,
      message: "Please enter a valid email address."
    },
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
});

UserSchema.plugin(uniqueValidator, {message: "That email is already registered."});

var User = mongoose.model('User', UserSchema);

module.exports = User;
