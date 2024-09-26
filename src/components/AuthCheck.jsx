import { React, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../config/firebase";
import { onAuthStateChanged } from "firebase/auth";
import MainContentDiv from "./MainContentDiv";
import { MyContext } from "../context/context";
import { toast,Bounce } from "react-toastify";
const AuthCheck = () => {
  const [loading, setLoading] = useState(true);
  const { authenticated, setAuthenticated } = useContext(MyContext);
  const navigate = useNavigate();
  const { setContextStateArray, contextStateArray, setSharedVar } =
    useContext(MyContext);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setAuthenticated(true);
      } else {
        setAuthenticated(false);
        toast.warn("Please Login to Proceed!", {
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
  return authenticated ? <MainContentDiv /> : null;
};

export default AuthCheck;
