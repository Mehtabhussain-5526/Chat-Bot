import React, { useContext, useEffect, useRef } from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../config/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { EyeBtn } from "./Graphics";
import { MyContext } from "../context/context";
import { Oval } from "react-loader-spinner";
import { toast, Bounce } from "react-toastify";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const { setContextStateArray, contextStateArray } = useContext(MyContext);
  const [loading, setLoading] = useState(false);

  document.addEventListener("load", (e) => {
    setContextStateArray([]);
  });
  const handleLogin = async (e) => {
    setLoading(true);
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      setTimeout(() => {
        navigate("/mainpage");
      }, 1000);
    } catch (err) {
      setLoading(false);
      setError(err.message);
      toast.error("Invalid Credentials!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Bounce,
      });
    }
  };

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  useEffect(() => {
    if (error.trim() == "") {
      setTimeout(() => {
        setError("");
      }, 5000);
    }
  }, [error]);

  return (
    <>
      {loading ? (
        <>
          {toast.success("Please wait Logging In...", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            transition: Bounce,
          })}
          <div className="flex items-center justify-center h-screen">
            <Oval
              height={80}
              width={80}
              color="#20B2AA"
              visible={true}
              ariaLabel="oval-loading"
              secondaryColor="#4682B4"
              strokeWidth={2}
              strokeWidthSecondary={5}
            />
          </div>
        </>
      ) : (
        <div className="flex items-center justify-center min-h-screen ">
          <div className="w-full max-w-md p-8 rounded-lg shadow-md bg-[#2F2F2F]">
            <h2 className="mb-3 text-2xl font-bold text-center text-white text-opacity-50">
              Login to Chat-Bot
            </h2>
            {error && (
              <div className="mt-2 text-center">
                <p className="text-red-500 text-[14px] tracking-wider">
                  Invalid Email address or Password
                </p>
              </div>
            )}
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
                <div className="relative flex items-center">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-3 py-[5px] border bg-[#2f2f2f] border-white border-opacity-50 rounded-md focus:outline-none focus:ring focus:ring-[#10a37f] focus:border-[#10a37f] placeholder:text-white placeholder:text-opacity-50 placeholder:text-[14px] text-white"
                    placeholder="Enter your password"
                    required
                  />
                  <div
                    onClick={handleTogglePassword}
                    className="absolute right-2"
                  >
                    <EyeBtn />
                  </div>
                </div>
              </div>
              <button
                type="submit"
                className="w-full px-4 py-[5px] font-bold text-white bg-[#10a37f] rounded hover:bg-[#119272] focus:outline-none focus:ring focus:ring-[#119272] "
              >
                Log In
              </button>
            </form>
            <div className="flex items-center justify-center mt-2 text-[13px]">
              <p className="text-white text-opacity-50">
                Don't have an account?
              </p>
              <Link to={"/signup"}>
                <button className="ml-[5px] text-[#11A37F] brightness-150">
                  Sign Up
                </button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Login;
