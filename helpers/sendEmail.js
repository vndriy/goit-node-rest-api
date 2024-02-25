const nodemailer = require("nodemailer");
require("dotenv").config();

const { META_PASSWORD } = process.env;
const config = {
  host: "smtp.meta.ua",
  port: 465,
  secure: true,
  auth: {
    user: "yoursmajesty@meta.ua",
    pass: META_PASSWORD,
  },
};

const transporter = nodemailer.createTransport(config);

const sendEmail = async ({
  to,
  subject,
  text,
  html,
  from = "yoursmajesty@meta.ua",
}) => {
  await transporter.sendMail({
    from,
    to,
    subject,
    text,
    html,
  });
};

module.exports = sendEmail;
