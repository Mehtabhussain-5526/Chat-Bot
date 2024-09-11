import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../config/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      console.log("User logged in:", user.uid);

      navigate("/mainpage");
    } catch (err) {
      setError(err.message);
      console.error("Error logging in:", err);
    }
  };

  return (
    <>
      <div className="flex items-center justify-center min-h-screen ">
        <div className="w-full max-w-md p-8 rounded-lg shadow-md bg-[#2F2F2F]">
          <h2 className="mb-6 text-2xl font-bold text-center text-white text-opacity-50 ">
            Login to Chat-Bot
          </h2>
          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <label
                className="block mb-2 text-sm font-bold text-white text-opacity-50"
                htmlFor="email"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-[5px] border rounded-md bg-[#2f2f2f] border-white border-opacity-50 focus:outline-none focus:ring focus:ring-[#10a37f] focus:border-[#10a37f] placeholder:text-white placeholder:text-opacity-50 placeholder:text-[14px] text-white"
                placeholder="Enter your email"
                required
              />
            </div>
            <div className="mb-6">
              <label
                className="block mb-2 text-sm font-bold text-white text-opacity-50"
                htmlFor="password"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-[5px] border bg-[#2f2f2f] border-white border-opacity-50 rounded-md focus:outline-none focus:ring focus:ring-[#10a37f] focus:border-[#10a37f] placeholder:text-white placeholder:text-opacity-50 placeholder:text-[14px] text-white"
                placeholder="Enter your password"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full px-4 py-[5px] font-bold text-white bg-[#10a37f] rounded hover:bg-[#119272] focus:outline-none focus:ring focus:ring-[#119272] "
            >
              Log In
            </button>
          </form>
          <div className="flex items-center justify-center mt-2 text-[13px]">
            <p className="text-white text-opacity-50">Don't have an account?</p>
            <Link to={"/signup"}>
              <button className="ml-[5px] text-[#11A37F] brightness-150">
                Sign Up
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
