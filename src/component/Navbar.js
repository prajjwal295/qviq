import {
  EmailAuthProvider,
  getAuth,
  reauthenticateWithCredential,
  signInWithPopup,
} from "firebase/auth";
import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { auth, googleProvider } from "../config/Firebase";
import { deleteFromMongo } from "../services/operations/authApi";
import { setSignupData, setToken } from "../utils/authSlice";
import { useDispatch } from "react-redux";

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { token } = useSelector((store) => store.auth);
  const { signupData } = useSelector((store) => store.auth);



  const handlelogOut = () => {
    dispatch(setToken(null));
    dispatch(setSignupData(null));
    navigate("/home");
  };

  return (
    <div className=" flex mx-auto w-full">
      <div className="flex justify-between items-center p-3 bg-white w-full">
        {/* left */}
        <div>
          <button
            className=" p-3  text-xl font-bold"
            onClick={() => navigate("/")}
          >
            Social View
          </button>
        </div>
        <div className="flex gap-3">
          {token ? (
            <>
              <button
                className="rounded-md p-3 bg-[#eff0ec] text-xl font-semibold"
                onClick={handlelogOut}
              >
                Log Out
              </button>
            </>
          ) : (
            <>
              <button
                className="rounded-md p-3 bg-[#eff0ec] text-xl font-semibold"
                onClick={() => navigate("/login")}
              >
                Log In
              </button>
              <button
                className="rounded-full p-3 bg-black text-xl font-semibold text-white px-8"
                onClick={() => navigate("/signin")}
              >
                Sign Up Free
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
