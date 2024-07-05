import React from "react";
import { login, signupWithGoogle } from "../services/operations/authApi";
import { setSignupData, setToken } from "../utils/authSlice";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import google from "../assets/google.png";
import toast from "react-hot-toast";

import { useState } from "react";
import { Link } from "react-router-dom";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../config/Firebase";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const handleOnSubmit = async (e) => {
    e.preventDefault();

    try {
      // Sign in with email and password
      const userCredential = await signInWithEmailAndPassword(
        auth,
        user.email,
        user.password
      );
      console.log("User Details:", userCredential);

      // Extract user details
      const userDetails = userCredential.user;
      const token = await userDetails.getIdToken();

      // Optionally, you might call an API for additional user data
      // const userData = await login(user); // Adjust based on your API call

      // Handle the authentication response
      // Dispatch actions to store token and user data
      dispatch(setToken(token));
      dispatch(setSignupData(userDetails));

      // Navigate to the profile or dashboard
      navigate(`/profile/${userDetails.uid}`);
    } catch (error) {
      console.error("Error during Login-in:", error);
      toast.error(
        "Login-in failed. Please check your credentials and try again."
      );
    }
  };

  const handleGoogleSignin = async () => {
    try {
      // Sign in with Google using a popup
      const result = await signInWithPopup(auth, googleProvider);
      const token = await result.user.getIdToken();

      if (result) {
        // Call the API to sign up or log in the user with the obtained token
        const userData = await signupWithGoogle(token);

        console.log({ userData });

        if (userData.type === "login") {
          // User exists, handle login
          dispatch(setToken(token));
          dispatch(setSignupData(userData.existUser));
          navigate(`/profile/${userData.existUser._id}`);
        } else if (userData.type === "signin") {
          // New user, handle sign-up
          dispatch(setToken(token));
          dispatch(setSignupData(userData.user));
          navigate("/additionalDetails");
        }
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
          <h1 className="text-black font-bold text-3xl">
            Login into Social View
          </h1>
          <p className="text-white"></p>
        </div>
        <form onSubmit={handleOnSubmit} className="flex flex-col  my-6 gap-5 ">
          <div className="flex flex-col gap-2">
            <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
              Email Address <sup className="text-pink-200">*</sup>
            </p>
            <input
              type="text"
              value={user.email}
              className="bg-richblack-700 p-3 rounded-md cursor-text shadow-[0_1px_0_0] shadow-richblack-50"
              placeholder="Enter Email Address"
              onChange={(e) => {
                setUser({ ...user, email: e.target.value });
              }}
            />
          </div>
          <div className=" flex flex-col gap-2 relative">
            <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
              Password <sup className="text-pink-200">*</sup>
            </p>
            <input
              type="text"
              value={user.password}
              className=" bg-richblack-700 p-3 rounded-md cursor-text shadow-[0_1px_0_0] shadow-richblack-50"
              placeholder="Enter Password"
              onChange={(e) => {
                setUser({ ...user, password: e.target.value });
              }}
            />
          </div>
          <button
            type="submit"
            className="mt-6 rounded-[8px] text-white py-[8px] px-[12px] font-medium bg-black"
          >
            Login
          </button>

          <hr></hr>

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

export default Login;
