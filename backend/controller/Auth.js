const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { uploadImageToCloudinary } = require("../utils/uploadImageToCloudinary");
const Profile = require("../models/Profile");

const mongoose = require("mongoose");

exports.signupWithGoogle = async (req, res) => {
  try {
    const { name, email, uid, picture } = req.user;

    let type;

    const firstName = name.split(" ")[0];
    const lastName = name.split(" ")[1] || " ";

    const existUser = await User.findOne({ uid: uid, email: email })
      .populate("additionalDetails")
      .exec();

    if (existUser) {
      return res.status(200).json({
        success: true,
        message: "User Already Existed ,hence loging in",
        existUser,
        type: "login",
      });
    }

    const profileDetails = await Profile.create({
      gender: null,
      accountType: "Public",
      coverPhoto: `https://api.dicebear.com/7.x/personas/svg?seed=${Math.floor(
        Math.random() * 101
      )}`,
      contact: null,
    });

    const user = await User.create({
      firstName,
      lastName,
      email,
      profilePhoto: picture,
      additionalDetails: profileDetails._id,
      uid: uid,
    });

    return res.status(200).json({
      success: true,
      message: "User registered successfully",
      user,
      uid,
      tpye: "signin",
    });
  } catch (err) {
    console.log(err);
    return res.status(400).json({
      success: false,
      message: "User creation failed",
    });
  }
};

exports.signup = async (req, res) => {
  try {
    const { uid } = req.user;

    const { firstName, lastName, email } = req.body;

    const { profilePhoto } = req.files;

    const existUser = await User.findOne({ uid: uid, email: email });

    if (existUser) {
      return res.status(400).json({
        success: false,
        message: "User Already Existed",
      });
    }

    const display = await uploadImageToCloudinary(
      profilePhoto,
      process.env.FOLDER_NAME
    );

    const profileDetails = await Profile.create({
      gender: null,
      accountType: "Public",
      coverPhoto: `https://api.dicebear.com/7.x/personas/svg?seed=${Math.floor(
        Math.random() * 101
      )}`,
      contact: null,
    });

    const user = await User.create({
      firstName,
      lastName,
      email,
      profilePhoto: display.secure_url,
      additionalDetails: profileDetails._id,
      uid: uid,
    });

    return res.status(200).json({
      success: true,
      message: "User registered successfully",
      user,
      uid,
    });
  } catch (err) {
    console.log(err);
    return res.status(400).json({
      success: false,
      message: "User creation failed",
    });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const { coverPhoto } = req.files;

    const { uid } = req.user;

    const { accountType, gender, contact } = req.body;

    if (!accountType || !gender || !coverPhoto || !uid || !contact) {
      return res.status(403).json({
        success: false,
        message: "All  Details not available",
      });
    }

    const cover = await uploadImageToCloudinary(
      coverPhoto,
      process.env.FOLDER_NAME
    );

    const userDetails = await User.findOne({ uid: uid, email: email });

    if (!userDetails) {
      return res.status(403).json({
        success: false,
        message: "User Does Not exist",
      });
    }

    const profileId = userDetails.additionalDetails;

    const updatedProfile = await Profile.findByIdAndUpdate(
      { _id: profileId },
      { coverPhoto: cover.secure_url },
      { contact: contact },
      { accountType: accountType },
      {
        gender: gender,
      },
      { new: true }
    );

    const userData = await User.findOne({ uid: uid })
      .populate("additionalDetails")
      .exec();

    res.send({
      success: true,
      message: `Additional details Updated successfully`,
      data: userData,
    });
  } catch (err) {
    console.log(err);
    return res.status(400).json({
      success: false,
      message: "Profile Updation Failed",
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Data is not available",
      });
    }

    const user = await User.findOne({ email: email })
      .populate("additionalDetails")
      .exec();

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (isPasswordValid) {
      const payload = {
        email: user.email,
        id: user._id,
        accountType: user.accountType,
      };
      const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "2h",
      });

      user.token = token;
      user.password = undefined;

      // create cookie
      const options = {
        expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
        httpOnly: true,
      };

      // send response
      res.cookie("token", token, options).status(200).json({
        success: true,
        token,
        user,
        message: "Login success",
        token,
      });
    } else {
      return res.status(401).json({
        success: false,
        message: "Password is incorrect",
      });
    }
  } catch (err) {
    return res.status(400).json({
      success: false,
      message: "Login Failed",
    });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const { uid } = req.user;

    if (!uid) {
      return res.status(400).json({
        success: false,
        message: "Data is not available",
      });
    }

    const user = await User.findOne({ uid: uid });

    console.log(user);

    const profileId = user.additionalDetails;

    const deleteProfile = await Profile.deleteOne({ _id: profileId });

    console.log(deleteProfile);

    await User.deleteOne({ uid: uid });

    // send response
    res.status(200).json({
      success: true,
      message: "User Deleted Succefully",
    });
  } catch (err) {
    return res.status(400).json({
      success: false,
      message: "User Deletion Failed",
    });
  }
};

exports.getUserData = async (req, res) => {
  console.log(req.params);
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "No user id",
      });
    }

    uid = new mongoose.Types.ObjectId(id);

    const user = await User.findById(uid).populate("additionalDetails").exec();

    return res.status(200).json({
      success: true,
      message: "User data",
      user,
    });
  } catch (err) {
    console.log(err);
    return res.status(400).json({
      success: false,
      message: "Error Failed",
    });
  }
};
