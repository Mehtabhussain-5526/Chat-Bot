import { React, useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Share } from "./Graphics";
import { auth, db } from "../config/firebase";
import { signOut } from "firebase/auth";
import { getDoc, doc } from "firebase/firestore";
import { MyContext } from "../context/context";
import { Oval } from "react-loader-spinner";

const Nav = () => {
  const [fullName, setFullName] = useState("");
  const navigate = useNavigate();
  const { setContextStateArray, contextStateArray } = useContext(MyContext);
  const user = auth.currentUser;
  const [loading, setLoading] = useState(false);

  const handleLogOut = () => {
    setContextStateArray([]);
    signOut(auth)
      .then(() => {
        navigate("/");
        // console.log("Signed out successfully", contextStateArray);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const fetchUserFullName = async (userId) => {
    try {
      setLoading(true);
      const userDocRef = doc(db, "users", userId);
      const userDocSnap = await getDoc(userDocRef);
      if (userDocSnap.exists()) {
        const userData = userDocSnap.data();
        const { firstName, lastName } = userData;
        setFullName(`${firstName} ${lastName}`);
      }
      fullName && setLoading(false);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  useEffect(() => {
    fetchUserFullName(user.uid);
  }, [user, fullName]);

  return (
    <>
      <div className=" bg-bgsecondary h-[56px] px-[20px] py-[10px]">
        <div className="flex items-center justify-between ">
          <div className="flex gap-8">
            <p className="text-[#9B9B9B] text-[24px]">ChatBot</p>
            <div className="text-[#9B9B9B] text-[16px] self-center font-semibold flex items-center ">
              User Fullname : &nbsp;
              {loading ? (
                <span className="ml-5">
                  <Oval
                    height={30}
                    width={30}
                    color="#20B2AA"
                    visible={true}
                    ariaLabel="oval-loading"
                    secondaryColor="#4682B4"
                    strokeWidth={2}
                    strokeWidthSecondary={5}
                  />
                </span>
              ) : (
                <span className="font-extrabold text-[20px] tracking-wide text-white font-mono">
                  {fullName}
                </span>
              )}
            </div>
          </div>
          <div className="flex gap-4 cursor-pointer px-3 py-[5px] bg-red-400 rounded hover:font-bold hover:bg-red-500 focus:outline-none focus:ring focus:ring-[#119272]" onClick={handleLogOut}>
            <p className="text-white text-[14px] tracking-wider self-center leading-[14px]">Logout</p>
            <Share />
          </div>
        </div>
      </div>
    </>
  );
};

export default Nav;
