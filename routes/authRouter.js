const express = require("express");
const validateBody = require("../helpers/validateBody.js");
const authenticate = require("../helpers/authenticate.js");
const upload = require("../helpers/upload.js");

const {
  registerUserSchema,
  loginUserSchema,
  updateSubscriptionSchema,
  emailSchema,
} = require("../schemas/userSchemas");
const {
  register,
  login,
  getCurrent,
  logout,
  updateSubscription,
  updateAvatar,
  verify,
  resendVerify,
} = require("../controllers/authControllers.js");

const authRouter = express.Router();

authRouter.post("/register", validateBody(registerUserSchema), register);
authRouter.get("/verify/:verificationToken", verify);
authRouter.post("/verify", validateBody(emailSchema), resendVerify);

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
