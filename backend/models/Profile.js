const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema({
  contact: {
    type: String,
  },
  coverPhoto: {
    type: String,
  },
  accountType: {
    type: String,
    enum: ["Public", "Private"],
  },
  gender: {
    type: String,
    enumm: ["Male", "Female", "Others"],
  },
});

module.exports = mongoose.model("Profile", profileSchema);
