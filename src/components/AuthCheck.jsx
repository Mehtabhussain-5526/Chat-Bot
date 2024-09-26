import { React, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../config/firebase";
import { onAuthStateChanged } from "firebase/auth";
import MainContentDiv from "./MainContentDiv";
import { MyContext } from "../context/context";
import { toast, Bounce } from "react-toastify";
import { Oval } from "react-loader-spinner";
import Login from "./Login";
const AuthCheck = () => {
  const [loading, setLoading] = useState(true);
  const [isVerified, setIsVerified] = useState(false);
  const navigate = useNavigate();
  const {
    setContextStateArray,
    contextStateArray,
    setSharedVar,
    authenticated,
    setAuthenticated,
  } = useContext(MyContext);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        if (user.emailVerified) {
          setAuthenticated(true);
          setIsVerified(true);
          toast.success("Verified.", {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            transition: Bounce,
          });
        } else {
          setAuthenticated(false);
          setIsVerified(false);
          toast.warn("Please verifiy you Email Address!", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            transition: Bounce,
          });
        }
      } else {
        setAuthenticated(false);
        toast.warn("Login to Proceed!", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          transition: Bounce,
        });
        navigate("/");
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, [navigate]);

  useEffect(() => {
    setContextStateArray([]);
    setSharedVar("");
  }, [authenticated]);

  const handleLoginRedirect = () => {
    navigate("/");
  };

  const handleVerifiyAccountDialog = () => {
    toast.warn("Verification email sent on given Email Address!", {
      position: "top-right",
      autoClose: 10000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Bounce,
    });
  };

  return authenticated ? (
    <MainContentDiv />
  ) : (
    <>
      {!isVerified && (
        <>
          <div
            onLoad={handleVerifiyAccountDialog}
            className="flex flex-col items-center justify-center min-h-screen"
          >
            <div className="max-w-md p-8 text-center rounded-lg shadow-md bg-[#2F2F2F]">
              <h1 className="mb-4 text-2xl font-bold text-center text-white text-opacity-50">
                Verify Your Account
              </h1>
              <p className="mb-6  text-[#10a37f] tracking-wider font-medium">
                Verification email sent
              </p>

              <ol className="mb-6 text-left text-white list-decimal list-inside">
                <li>Check your inbox.</li>
                <li>Open the verification email.</li>
                <li>
                  Verification email will be named as &#40;{" "}
                  <strong className="text-[#10a37f]">noreply</strong> &#41;.
                </li>
                <li>
                  Click the verification link provided to verify your account.
                </li>
              </ol>

              <p className="mb-6 text-white">
                After verification, Please log in again.
              </p>

              <button
                onClick={handleLoginRedirect}
                className="px-4 py-2 text-whitepx-4 font-bold text-white bg-[#10a37f] rounded hover:bg-[#119272] focus:outline-none focus:ring focus:ring-[#119272]"
              >
                Login
              </button>
            </div>
          </div>
        </>
      )}
    </>
  );
};
export default AuthCheck;
