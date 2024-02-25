const express = require("express");
const validateBody = require("../helpers/validateBody.js");
const authenticate = require("../helpers/authenticate.js");
// const isValid = require("../helpers/isValid.js");
const upload = require("../helpers/upload.js");

const {
  registerUserSchema,
  loginUserSchema,
  updateSubscriptionSchema,
} = require("../schemas/userSchemas");
const {
  register,
  login,
  getCurrent,
  logout,
  updateSubscription,
  updateAvatar,
} = require("../controllers/authControllers.js");

const authRouter = express.Router();

authRouter.post("/register", validateBody(registerUserSchema), register);
authRouter.post("/login", validateBody(loginUserSchema), login);

authRouter.post("/logout", authenticate, logout);
authRouter.get("/current", authenticate, getCurrent);
authRouter.patch(
  "/subscription",
  authenticate,
  validateBody(updateSubscriptionSchema),
  updateSubscription
);
authRouter.patch(
  "/avatars",
  authenticate,
  upload.single("avatarURL"),
  updateAvatar
);

module.exports = authRouter;
