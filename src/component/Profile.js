import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  deleteFromMongo,
  getUserDetails,
} from "../services/operations/authApi";
import { useEffect } from "react";
import QR from "./QR";
import { auth } from "../config/Firebase";
import { setSignupData, setToken } from "../utils/authSlice";
import { useSelector, useDispatch } from "react-redux";

const Profile = () => {
  const [user, setUser] = useState(null);

  const dispatch = useDispatch();

  const { token } = useSelector((store) => store.auth);

  const navigate = useNavigate();

  const { userId } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getUserDetails(userId);
        setUser(data);
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };

    fetchData();
  }, [userId]);

  const handleOnClick = async () => {
    const user = auth.currentUser;

    if (!user) {
      console.log("No user is currently signed in");
      return;
    }

    console.log(user);

    const deleteUser = await user.delete();

    console.log(deleteUser);

    await deleteFromMongo(token, user.uid);

    dispatch(setToken(null));
    dispatch(setSignupData(null));
    navigate("/home");

    console.log("User deleted successfully");
  };

  return (
    <div className=" mx-auto w-[11/12] p-2 ">
      {user && (
        <>
          <div className="text-4xl font-bold text-white my-8 underline">
            User Details
          </div>
        </>
      )}
      {user ? (
        <div className="bg-white rounded-md  w-[1200px] h-full flex flex-col items-center  gap-2 max-w-[90vw]">
          <div className="max-h-[200px] w-[1200px] max-w-[90vw]">
            <img
              src={user?.additionalDetails?.coverPhoto}
              alt="cover"
              className=" max-h-[200px] w-full bg-cover"
            />
          </div>
          <div className="flex w-full gap-5 items-center max-md:flex-col">
            <div className="flex-[30%] flex flex-col  items-center border-black">
              <div className="rounded-full w-[300px] h-[300px]">
                <img
                  src={user?.profilePhoto}
                  alt="dp"
                  className="rounded-full w-[300px] h-[300px] bg-cover"
                />
              </div>
              <div className="flex flex-col items-center">
                <h1 className="flex gap-2 text-xl font-semibold">
                  {user?.firstName} {user?.lastName}
                </h1>
                <h1>{user?._id}</h1>
              </div>
            </div>
            <div className="flex-[40%] flex flex-col items-center text-xl  ">
              <h1 className="underline">Additional Details</h1>

              <div className="flex flex-col gap-2 items-start">
                <div className="flex gap-2 items-center">
                  <h1 className="text-lg font-bold">Contact Number</h1>
                  <h1>{user?.contact}</h1>
                </div>
                <div className="flex gap-2 items-center">
                  <h1 className="text-lg font-bold">Gender</h1>
                  <h1>{user?.additionalDetails?.Gender}</h1>
                </div>
                <div className="flex gap-2 items-center">
                  <h1 className="text-lg font-bold">Email</h1>
                  <h1>{user?.email}</h1>
                </div>
                <div className="flex gap-2 items-center">
                  <h1 className="text-lg font-bold">Account Type</h1>
                  <h1>{user?.additionalDetails?.accountType}</h1>
                </div>

                {token && (
                  <div className="mt-10">
                    <button
                      className="rounded-md p-3 bg-red-600 text-xl font-semibold text-white"
                      onClick={handleOnClick}
                    >
                      Delete Account
                    </button>
                  </div>
                )}
              </div>
            </div>
            <div className="flex-[30%]">
              <QR value={userId} />
            </div>
          </div>
        </div>
      ) : (
        <>
          <div className="text-white font-bold text-3xl">User id is wrong</div>
        </>
      )}
    </div>
  );
};

export default Profile;
