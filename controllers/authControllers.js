const bcrypt = require("bcrypt");
const HttpError = require("../helpers/HttpError");
const controllerWrapper = require("../helpers/controllerWrapper");

const register = async (req, res) => {
  try {
    const { password } = req.body;
    const hashPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({ ...req.body, password: hashPassword });

    res.status(201).json({
      user: {
        email: newUser.email,
        subscription: newUser.subscription,
      },
    });
  } catch (error) {
    if (error.message.includes("E11000")) {
      throw HttpError(409, "Email in use");
    }
    throw HttpError();
  }
};

module.exports = {
  register: controllerWrapper(register),
};
