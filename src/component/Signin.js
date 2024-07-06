import React from "react";
import { useState } from "react";
import toast from "react-hot-toast";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { signup, signupWithGoogle } from "../services/operations/authApi";
import { setSignupData, setToken } from "../utils/authSlice";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { auth, googleProvider } from "../config/Firebase";
import google from "../assets/google.png";
import { createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";

const Signin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    profilePhoto: null,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [imageSrc, setImageSrc] = useState(null);

  const handleOnSubmit = async (e) => {
    e.preventDefault();

    if (user.pass != user.confirmPass) {
      toast.error("Password Do not Match");
      return;
    }

    try {
      if (!validateEmail(user.email)) {
        throw new Error("Invalid email format");
      }
      // Create user with email and password
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        user.email,
        user.password
      );
      console.log({ userCredential });

      // Extract user details and token
      const userDetails = userCredential.user;
      const token = await userDetails.getIdToken();

      // Call the signup API with user details and token
      const userData = await signup(user, token);
      console.log({ userData });

      if (userData) {
        dispatch(setToken(token));
        dispatch(setSignupData(userData.user));
        navigate("/additionalDetails");
      }
    } catch (error) {
      console.error("Error during sign-up:", error);
      toast.error("Sign-up failed. Please try again.");
    }
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImageSrc(reader.result);
    };
    if (file) {
      setUser({ ...user, profilePhoto: file });
    }
  };

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleGoogleSignin = async () => {
    try {
      // Sign in with Google using a popup
      const result = await signInWithPopup(auth, googleProvider);
      console.log(result);
      const token = await result.user.getIdToken();

      // Call the API to sign up or log in the user with the obtained token
      const userData = await signupWithGoogle(token);

      console.log({ userData });

      if (userData.type == "login") {
        // User exists, handle login
        dispatch(setToken(token));
        dispatch(setSignupData(userData.existUser));
        navigate(`/profile/${userData.existUser._id}`);
      } else if (userData.type == "signin") {
        // New user, handle sign-up
        dispatch(setToken(token));
        dispatch(setSignupData(userData.user));
        navigate("/additionalDetails");
      }
    } catch (error) {
      console.error("Error during Google sign-in:", error);
      toast.error("Google sign-in failed. Please try again.");
    }
  };

  return (
    <div className="w-[11/12] mx-auto">
      <div className="border-red-300 flex-col gap-5 justify-center items-center mt-10">
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-black font-bold text-3xl">Join Social View</h1>
          <p className="text-white">Explore the New Journey</p>
        </div>
        <form
          onSubmit={handleOnSubmit}
          className="flex flex-col my-6 gap-3 pl-5"
        >
          <div className="flex gap-5 flex-col">
            <div className="flex flex-col gap-2 relative">
              <p className="mb-1 text-[0.875rem] leading-[1.375rem]">
                First Name <sup className="text-pink-200">*</sup>
              </p>
              <input
                type="text"
                value={user?.firstName}
                className=" bg-richblack-800 p-3 rounded-md cursor-text border-b-[1px] bg-[#eff0ec]"
                placeholder="First Name"
                onChange={(e) => {
                  setUser({ ...user, firstName: e.target.value });
                }}
              />
            </div>
            <div className=" flex flex-col gap-2 relative">
              <p className="mb-1 text-[0.875rem] leading-[1.375rem]">
                Last Name <sup className="text-pink-200">*</sup>
              </p>
              <input
                type="text"
                value={user?.lastName}
                className=" bg-richblack-800 p-3 rounded-md cursor-text border-b-[1px] bg-[#eff0ec]"
                placeholder="Last Name"
                onChange={(e) => {
                  setUser({ ...user, lastName: e.target.value });
                }}
              />
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
              Email Address <sup className="text-pink-200">*</sup>
            </p>
            <input
              type="text"
              value={user?.email}
              className="bg-richblack-800 p-3 rounded-md cursor-text border-b-[1px] bg-[#eff0ec]"
              placeholder="Enter Email Address"
              onChange={(e) => {
                setUser({ ...user, email: e.target.value });
              }}
            />
          </div>
          <div className="flex gap-5 max-md:flex-col">
            <div className=" flex flex-col gap-2 relative">
              <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
                Password <sup className="text-pink-200">*</sup>
              </p>
              <input
                type={showPassword ? "text" : "password"}
                value={user?.password}
                className=" bg-richblack-800 p-3 rounded-md cursor-text border-b-[1px] bg-[#eff0ec]"
                placeholder="Enter Password"
                onChange={(e) => {
                  setUser({ ...user, password: e.target.value });
                }}
              />
              <span
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-3 top-[45px] z-[10] cursor-pointer"
              >
                {showPassword ? (
                  <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
                ) : (
                  <AiOutlineEye fontSize={24} fill="#AFB2BF" />
                )}
              </span>
            </div>
            <div className=" flex flex-col gap-2 relative">
              <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
                Confirm Password <sup className="text-pink-200">*</sup>
              </p>
              <input
                type="text"
                value={user?.confirmPassword}
                className=" bg-richblack-800 p-3 rounded-md cursor-text border-b-[1px] bg-[#eff0ec]"
                placeholder="Confirm Password"
                onChange={(e) => {
                  setUser({ ...user, confirmPassword: e.target.value });
                }}
              />
            </div>
          </div>
          <div className="max-w-24">
            <p className="mb-1 text-[0.875rem] leading-[1.375rem]">
              Display Picture <sup className="text-pink-200">*</sup>
            </p>
            <input
              type="file"
              accept="image/*"
              className="bg-richblack-800 p-3 rounded-md cursor-pointer border-b-[1px] bg-[#eff0ec]"
              onChange={handlePhotoChange}
            />
            {user.profilePhoto && (
              <div className="mt-2">
                <img
                  src={imageSrc}
                  alt="Display Picture"
                  className="w-full h-full"
                />
              </div>
            )}
          </div>
          <button
            type="submit"
            className="mt-6 rounded-[8px] text-white py-[8px] px-[12px] font-medium bg-black"
            onClick={handleOnSubmit}
          >
            Signin
          </button>

          <button
            type="submit"
            className="mt-6 rounded-[8px] text-black py-[8px] px-[12px] font-medium bg-white"
            onClick={handleGoogleSignin}
          >
            <div className="flex gap-5">
              <img src={google} alt="google" className="h-8 w-8" />
              <p>Sign In With Google</p>
            </div>
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signin;
