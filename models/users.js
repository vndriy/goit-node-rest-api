const { Schema, model } = require("mongoose");

const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

const userSchema = new Schema({
  password: {
    type: String,
    required: [true, "Password is required"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
  },
  subscription: {
    type: String,
    enum: ["starter", "pro", "business"],
    default: "starter",
  },
  token: {
    type: String,
    default: null,
  },
  avatarURL: String,
});

const User = model("user", userSchema);

module.exports = User;
