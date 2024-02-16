const mongoose = require("mongoose");
const app = require("./app");
const dotenv = require("dotenv");
dotenv.config();

const { DB_HOST } = process.env;

mongoose
  .connect(DB_HOST)
  .then(() =>
    app.listen(3001, () => console.log("Database connection successful"))
  )
  .catch((err) => {
    console.error(err.message);
    process.exit(1);
  });
