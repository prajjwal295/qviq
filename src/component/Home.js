import React from "react";
import { useNavigate } from "react-router-dom";
import insta from "../assets/insta.png";
import Image from "./Image";

const Home = () => {
  const navigate = useNavigate();
  return (
    <div className="flex max-md:flex-col">
      <div className="flex flex-[50%] justify-between items-center font-enter w-[100vw] mx-8  border-black-solid">
        <div className=" flex-col gap-6 h-[100vh] items-center justify-between mx-auto text-[#d2e823] font-enter border-black-solid">
          <div className="text-5xl font-extrabold my-10">
            Welcome to Social View
          </div>

          <div className="flex gap-3 max-md:flex-col justify-center items-center">
            <button
              className="rounded-md p-3 bg-[#eff0ec] text-xl font-semibold text-black"
              onClick={() => navigate("/login")}
            >
              Log In
            </button>
            <button
              className="rounded-md p-3 bg-black text-xl font-semibold text-white "
              onClick={() => navigate("/signin")}
            >
              Sign Up Free
            </button>
          </div>
        </div>
      </div>
      <div className="flex flex-[50%] items-center justify-center w-full ">
        <Image src={insta} alt="animated image" />
      </div>
    </div>
  );
};

export default Home;
