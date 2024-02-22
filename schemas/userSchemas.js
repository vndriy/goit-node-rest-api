const Joi = require("joi");

const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

const registerUserSchema = Joi.object({
  email: Joi.string().required().pattern(emailRegex),
  password: Joi.string().min(6).required(),
});

const loginUserSchema = Joi.object({
  password: Joi.string().required(),
  email: Joi.string().required().pattern(emailRegex),
});

const updateSubscriptionSchema = Joi.object({
  subscription: Joi.string()
    .valid("starter", "pro", "business")
    .required()
    .messages({
      "any.required": "missing field subscription",
    }),
});

module.exports = {
  registerUserSchema,
  loginUserSchema,
  updateSubscriptionSchema,
};
