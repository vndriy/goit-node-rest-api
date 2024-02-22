const bcrypt = require("bcrypt");
const HttpError = require("../helpers/HttpError");
const controllerWrapper = require("../helpers/controllerWrapper");
const User = require("../models/users");
const jwt = require("jsonwebtoken");
const gravatar = require("gravatar");
const fs = require("fs/promises");
const path = require("path");
const Jimp = require("jimp");

const dotenv = require("dotenv");
dotenv.config();
const { JWT_SECRET } = process.env;

const register = async (req, res) => {
  try {
    const { password, email } = req.body;
    const hashPassword = await bcrypt.hash(password, 10);
    const avatarURL = gravatar.url(email);

    const newUser = await User.create({
      ...req.body,
      avatarURL,
      password: hashPassword,
    });

    res.status(201).json({
      user: {
        email: newUser.email,
        subscription: newUser.subscription,
        avatarURL: newUser.avatarURL,
      },
    });
  } catch (error) {
    if (error.message.includes("E11000")) {
      throw HttpError(409, "Email in use");
    }
    throw HttpError();
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  const { _id: id } = user;
  if (!user) {
    throw HttpError(401, "Email or password is wrong");
  }

  const comparePassword = await bcrypt.compare(password, user.password);
  if (!comparePassword) {
    throw HttpError(401, "Email or password is wrong");
  }

  payload = {
    id,
  };

  const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "12h" });
  await User.findByIdAndUpdate(id, { token });

  res.status(200).json({
    token,
    user: {
      email: user.email,
      subscription: user.subscription,
    },
  });
};

const logout = async (req, res) => {
  const { _id } = req.user;
  await User.findByIdAndUpdate(_id, { token: "" });
  res.status(204).json({ message: "No Content" });
};

const getCurrent = async (req, res) => {
  const { email, subscription } = req.user;
  res.json({ email, subscription });
};

const updateSubscription = async (req, res) => {
  const { id } = req.params;
  const result = await User.findByIdAndUpdate(id, req.body, { new: true });
  if (!result) {
    throw HttpError(404);
  }
  res.status(200).json(result);
};

const updateAvatar = async (req, res) => {
  const { _id } = req.user;

  if (!req.file) {
    throw HttpError(400, "No file was provided for upload!");
  }

  const { filename } = req.file;

  const tmpPath = path.resolve("tmp", filename);
  const newPath = path.resolve("public", "avatars", filename);

  const jimpAvatar = await Jimp.read(tmpPath);
  await jimpAvatar.resize(250, 250).write(tmpPath);

  await fs.rename(tmpPath, newPath);

  const result = await User.findByIdAndUpdate(
    _id,
    { avatarURL: newPath },
    { new: true }
  );
  if (!result) {
    throw HttpError(404);
  }
  res.status(200).json({
    avatarURL: result.avatarURL,
  });
};

module.exports = {
  register: controllerWrapper(register),
  login: controllerWrapper(login),
  getCurrent: controllerWrapper(getCurrent),
  logout: controllerWrapper(logout),
  updateSubscription: controllerWrapper(updateSubscription),
  updateAvatar: controllerWrapper(updateAvatar),
};
