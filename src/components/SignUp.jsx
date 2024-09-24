import React, { useContext, useState } from "react";
import { Link, useNavigate, useNavigation } from "react-router-dom";
import { auth, db } from "../config/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore"; // For writing to Firestore
import { EyeBtn } from "./Graphics";
import { MyContext } from "../context/context";

const SignUp = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      await setDoc(doc(db, "users", user.uid), {
        id: user.uid,
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password,
      });
      navigate("/mainpage");
    } catch (err) {
      setError(err.message);
    }
  };

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };
  return (
    <>
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-full max-w-md p-8 rounded-lg shadow-md bg-[#2F2F2F]">
          <h2 className="mb-6 text-2xl font-bold text-center text-white text-opacity-50">
            Sign Up to Chat-Bot
          </h2>
          <form onSubmit={handleSignup}>
            <div className="mb-4">
              <label
                className="block mb-2 text-sm font-bold text-white text-opacity-50"
                htmlFor="firstName"
              >
                First Name
              </label>
              <input
                type="text"
                id="firstName"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="w-full px-3 py-[5px] border bg-[#2f2f2f] border-white border-opacity-50 rounded-md focus:outline-none focus:ring focus:ring-[#10a37f] focus:border-[#10a37f] placeholder:text-white placeholder:text-opacity-50 placeholder:text-[14px] text-white"
                placeholder="Enter your first name"
                required
              />
            </div>
            <div className="mb-4">
              <label
                className="block mb-2 text-sm font-bold text-white text-opacity-50"
                htmlFor="lastName"
              >
                Last Name
              </label>
              <input
                type="text"
                id="lastName"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="w-full px-3 py-[5px] border bg-[#2f2f2f] border-white border-opacity-50 rounded-md focus:outline-none focus:ring focus:ring-[#10a37f] focus:border-[#10a37f] placeholder:text-white placeholder:text-opacity-50 placeholder:text-[14px] text-white"
                placeholder="Enter your last name"
                required
              />
            </div>
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
                className="w-full px-3 py-[5px] border bg-[#2f2f2f] border-white border-opacity-50 rounded-md focus:outline-none focus:ring focus:ring-[#10a37f] focus:border-[#10a37f] placeholder:text-white placeholder:text-opacity-50 placeholder:text-[14px] text-white"
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
              className="w-full px-4 py-[5px] font-bold text-white bg-[#10a37f] rounded hover:bg-[#119272] focus:outline-none focus:ring focus:ring-[#119272]"
            >
              Sign Up
            </button>
          </form>
          <div className="flex items-center justify-center mt-2 text-[13px]">
            <p className="text-white text-opacity-50">
              Already have an account?
            </p>
            <Link to={"/mainpage"}>
              <button className="ml-[5px] text-[#11A37F] brightness-150">
                Log In
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp;
