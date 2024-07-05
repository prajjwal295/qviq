const mongoose = require("mongoose");

require("dotenv").config();

exports.connect = () => {
  mongoose
    .connect(process.env.MONGODB_URL, {})
    .then(() => {
      console.log("db successfull");
    })
    .catch((err) => {
      console.log("db error");
      console.error(err);
      process.exit(1);
    });
};
