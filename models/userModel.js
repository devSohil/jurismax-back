const mongoose = require("mongoose");

const UserModel = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Username is required"],
  },
  phonenumber: {
    type: Number,
    required: [true, "Phone number is required"],
  },
  password: {
    type: String,
    required: [true, "Password is required"],
  },
  email: {
    type: String,
  },
  phonenumberVerified: {
    type: Boolean,
    default: false,
  },
  emailVerified: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("User", UserModel);
