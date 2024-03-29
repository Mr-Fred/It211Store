const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter your name"],
  },
  email: {
    type: String,
    required: [true, "Please enter your email address"],
    unique: true,
    lowercase: true,
    validators: [validator.isEmail, "Please enter a valid email address"],
  },
  photo: String,
  password: {
    type: String,
    required: [true, "Please enter your password"],
    minlength: 3,
  },
  passwordConfirm: {
    type: String,
    required: [true, "Please confirm your password"],
  },
});

const User = mongoose.model("User", userSchema);
module.exports = User;
