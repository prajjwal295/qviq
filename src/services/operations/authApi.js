import toast from "react-hot-toast";
import { apiConnector } from "../apiconnector";
// const BASE_URL = process.env.REACT_APP_BASE_URL;

const BASE_URL = "https://qviq-1.onrender.com";

export const signup = async (userData, token) => {
  const toastId = toast.loading("Loading...");

  const {
    firstName,
    lastName,
    email,
    password,
    confirmPassword,
    profilePhoto,
  } = userData;

  console.log({ profilePhoto });

  console.log({ token });

  let data = null;

  try {
    const response = await apiConnector(
      "POST",
      `${BASE_URL}/auth/signup`,
      {
        firstName,
        lastName,
        email,
        password,
        confirmPassword,
        profilePhoto,
      },
      {
        Authorization: `Bearer ` + token,
        "Content-Type": "multipart/form-data",
      }
    );

    data = response.data;
    console.log(data);

    console.log("Signup API Response.....", response);

    if (!response.data.success) {
      throw new Error(response.data.message);
    }

    toast.success("Signup Successfull");
  } catch (error) {
    console.log("Signnp API ERROR............", error);
    toast.error("Signup Failed");
  }
  toast.dismiss(toastId);
  return data;
};

export const additionalDetails = async (formData, token) => {
  const toastId = toast.loading("Loading...");

  console.log(token);

  let data = null;

  try {
    const response = await apiConnector(
      "PUT",
      `${BASE_URL}/auth/updateProfile`,
      formData,
      {
        Authorization: `Bearer ` + token,
        "Content-Type": "multipart/form-data",
      }
    );

    data = response.data.data;
    console.log(data);

    console.log("Additional Details API Response.....", response);

    if (!response.data.success) {
      throw new Error(response.data.message);
    }

    toast.success("Addtional Details added Successfull");
  } catch (error) {
    console.log("Addtional Details ERROR............", error);
    toast.error("Addtional Details");
  }
  toast.dismiss(toastId);
  return data;
};

export const getUserDetails = async (userId) => {
  console.log(`${BASE_URL}/auth/getUserDetails/${userId}`);
  const toastId = toast.loading("Loading...");
  let data = null;

  try {
    const response = await apiConnector(
      "GET",
      `${BASE_URL}/auth/getUserDetails/${userId}`,
      null
    );

    data = response.data.user;

    console.log("data fetched API Response.....", response);

    if (!response.data.success) {
      throw new Error(response.data.message);
    }

    toast.success(" data fetched Successfull");
  } catch (error) {
    console.log("data fetched ERROR............", error);
    toast.error("data fetched Details");
  }
  toast.dismiss(toastId);
  return data;
};

export const signupWithGoogle = async (token) => {
  const toastId = toast.loading("Loading...");

  console.log({ token });

  let data = null;

  try {
    const response = await apiConnector(
      "POST",
      `${BASE_URL}/auth/signupWithGoogle`,
      null,
      {
        Authorization: `Bearer ` + token,
      }
    );

    data = response.data;
    console.log(data);

    console.log("Signup API Response.....", response);

    if (!response.data.success) {
      throw new Error(response.data.message);
    }

    toast.success("Signup Successfull");
  } catch (error) {
    console.log("Signnp API ERROR............", error);
    toast.error("Signup Failed");
  }
  toast.dismiss(toastId);
  return data;
};

export const deleteFromMongo = async (token, userId) => {
  const toastId = toast.loading("Loading...");

  try {
    const response = await apiConnector(
      "DELETE",
      `${BASE_URL}/auth/deleteUser`,
      userId,
      {
        Authorization: `Bearer ` + token,
      }
    );

    console.log(response);

    if (!response.data.success) {
      throw new Error(response.data.message);
    }

    toast.success("deletion Successfull");
  } catch (error) {
    console.log("deletion............", error);
    toast.error("deletion Failed");
  }
  toast.dismiss(toastId);
};
