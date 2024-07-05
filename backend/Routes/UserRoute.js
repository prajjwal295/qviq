const express = require("express");

const router = express.Router();

const {
  signup,
  updateProfile,
  getUserData,
  signupWithGoogle,
  deleteUser,
} = require("../controller/Auth");

const { auth } = require("../middleware/auth");

router.post("/signup", auth, signup);
router.post("/signupWithGoogle", auth, signupWithGoogle);
router.put("/updateProfile", auth, updateProfile);
router.get("/getUserDetails/:id", getUserData);
router.delete("/deleteUser", auth, deleteUser);

module.exports = router;
