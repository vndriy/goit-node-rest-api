const express = require("express");
const validateBody = require("../helpers/validateBody.js");
const authenticate = require("../helpers/authenticate.js");
const isValid = require("../helpers/isValid.js");

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

module.exports = authRouter;
