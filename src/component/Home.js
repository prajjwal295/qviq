import React from "react";
import { useNavigate } from "react-router-dom";
import Image from "./Image";

const Home = () => {
  const navigate = useNavigate();
  return (
    <div className="w-full  border-black-solid">
      <div className="flex justify-between items-center font-enter w-[11/12] mx-10  border-black-solid">
        <div className=" flex-col gap-6 h-[100vh] items-center justify-between w-[50%] text-[#d2e823] font-enter border-black-solid">
          <div className="text-5xl font-extrabold my-10">
            Welcome to Socail View
          </div>
          <div className="max-w-[50%] m-10">
            <p className="text-2xl font-semibold">
              Join 50M+ people using Linktree for their link in bio. One link to
              help you share everything you create, curate and sell from your
              Instagram, TikTok, Twitter, YouTube and other social media
              profiles.
            </p>
          </div>
          <div className="flex gap-3">
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

        <div className="w-[50%]  border-black-solid h-[100vh]">
          <Image />
        </div>
      </div>
    </div>
  );
};

export default Home;
