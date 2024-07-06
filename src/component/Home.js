import React from "react";
import { useNavigate } from "react-router-dom";
import insta from "../assets/insta.png";
import Image from "./Image";

const Home = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col md:flex-row max-w-[100vw] min-w-[100vw]">
      <div className="flex flex-col md:flex-[50%] justify-center items-center font-enter w-full md:w-[50vw] md:mx-8 border-2 border-black">
        <div className="flex flex-col gap-6 h-full md:h-[100vh] items-center justify-center mx-auto text-[#d2e823] font-enter border-black-solid p-4">
          <div className="text-3xl md:text-5xl font-extrabold my-10 text-center">
            Welcome to Social View
          </div>
          <div className="flex flex-col md:flex-row gap-3 justify-center items-center">
            <button
              className="rounded-md p-3 bg-[#eff0ec] text-lg md:text-xl font-semibold text-black"
              onClick={() => navigate("/login")}
            >
              Log In
            </button>
            <button
              className="rounded-md p-3 bg-black text-lg md:text-xl font-semibold text-white"
              onClick={() => navigate("/signin")}
            >
              Sign Up Free
            </button>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-center w-full md:w-[50vw] h-[80vh] md:h-[100vh] border-2 border-black">
        <Image src={insta} alt="animated image" />
      </div>
    </div>
  );
};

export default Home;
