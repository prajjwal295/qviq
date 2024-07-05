import React from "react";
import { useState } from "react";
import { additionalDetails } from "../services/operations/authApi";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setSignupData } from "../utils/authSlice";
import toast from "react-hot-toast";

const AditonalDetails = () => {
  const { token } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [user, setUser] = useState({
    gender: "",
    accountType: "",
    coverPhoto: null,
    contact: "",
  });

  const handleOnSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("gender", user.gender);
    formData.append("accountType", user.accountType);
    formData.append("coverPhoto", user.coverPhoto);
    formData.append("contact", user.contact);

    try {
      // Submit form data
      const userData = await additionalDetails(formData, token);

      if (userData) {
        // Dispatch the user data and navigate if successful
        dispatch(setSignupData(userData));
        navigate(`/profile/${userData._id}`);
      }
    } catch (error) {
      // Handle errors (e.g., display an error message)
      console.error("Error submitting additional details:", error);
      toast.error(
        "An error occurred while submitting additional details. Please try again."
      );
    }
  };

  const handleCoverChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUser({ ...user, coverPhoto: file });
    }
  };

  return (
    <div className="w-[11/12] mx-auto">
      <div className="border-red-300 flex-col gap-5 justify-center items-center mt-10">
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-black font-bold text-3xl">Aditional Details</h1>
          <p className="text-white">Mention other Details</p>
        </div>
        <form
          onSubmit={handleOnSubmit}
          className="flex flex-col my-6 gap-3 pl-5"
        >
          <p className="mb-1 text-[0.875rem] leading-[1.375rem]">
            Cover Picture <sup className="text-pink-200">*</sup>
          </p>
          <input
            type="file"
            accept="image/*"
            className="bg-richblack-800 p-3 rounded-md cursor-pointer border-b-[1px] bg-[#eff0ec]"
            onChange={handleCoverChange}
          />
          {user.coverPhoto && (
            <div className="mt-2">
              <img
                src={user.coverPhoto}
                alt="Display Picture"
                className="w-20 h-20 rounded-full"
              />
            </div>
          )}

          <div className="flex flex-col gap-2">
            <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
              Mobile Number <sup className="text-pink-200">*</sup>
            </p>
            <input
              type="Number"
              value={user?.contact}
              className="bg-richblack-800 p-3 rounded-md cursor-text border-b-[1px] bg-[#eff0ec]"
              placeholder="Enter Contact Number"
              onChange={(e) => {
                setUser({ ...user, contact: e.target.value });
              }}
            />
          </div>
          <div className="flex flex-col gap-2 relative">
            <p className="mb-1 text-[0.875rem] leading-[1.375rem]">
              Account Type <sup className="text-pink-200">*</sup>
            </p>
            <select
              value={user?.accountType}
              className="bg-richblack-800 p-3 rounded-md cursor-pointer border-b-[1px] bg-[#eff0ec]"
              onChange={(e) => {
                setUser({ ...user, accountType: e.target.value });
              }}
            >
              <option value="" disabled>
                Select Account Type
              </option>
              <option value="public">Public</option>
              <option value="private">Private</option>
            </select>
          </div>

          <div className="flex gap-4 relative  flex-col">
            <p className="mb-1 text-[0.875rem] leading-[1.375rem]">
              Gender <sup className="text-pink-200">*</sup>
            </p>
            <div className="flex items-center gap-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  value="Male"
                  checked={user?.gender === "Male"}
                  onChange={(e) => setUser({ ...user, gender: e.target.value })}
                  className="mr-2"
                />
                Male
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  value="Female"
                  checked={user?.gender === "Female"}
                  onChange={(e) => setUser({ ...user, gender: e.target.value })}
                  className="mr-2"
                />
                Female
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  value="Other"
                  checked={user?.gender === "Other"}
                  onChange={(e) => setUser({ ...user, gender: e.target.value })}
                  className="mr-2"
                />
                Other
              </label>
            </div>
          </div>
          <button
            type="submit"
            className="mt-6 rounded-[8px] text-white py-[8px] px-[12px] font-medium bg-black"
            onClick={handleOnSubmit}
          >
            Update Details
          </button>
        </form>
      </div>
    </div>
  );
};

export default AditonalDetails;
