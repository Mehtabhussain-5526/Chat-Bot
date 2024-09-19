import { React, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Share } from "./Graphics";
import { auth, db } from "../config/firebase";
import { signOut } from "firebase/auth";
import { getDoc, doc } from "firebase/firestore";

const Nav = () => {
  const [fullName, setFullName] = useState("");
  const navigate = useNavigate();
  const user = auth.currentUser;

  const handleLogOut = () => {
    signOut(auth)
      .then(() => {
        navigate("/");
        console.log("Signed out successfully");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const fetchUserFullName = async (userId) => {
    try {
      const userDocRef = doc(db, "users", userId);

      const userDocSnap = await getDoc(userDocRef);
      if (userDocSnap.exists()) {
        const userData = userDocSnap.data();
        const { firstName, lastName } = userData;

        setFullName(`${firstName} ${lastName}`);
      } else {
        console.log("No such user document!");
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  useEffect(() => {
    fetchUserFullName(user.uid);
    // console.log("user data... ", user.uid, fullName);
  }, [user]);

  return (
    <>
      <div className=" bg-bgsecondary h-[56px] px-[20px] py-[10px]">
        <div className="flex items-center justify-between w-full">
          <div className="flex gap-8">
            <p className="text-[#9B9B9B] text-[24px]">ChatBot</p>
            <p className="text-[#9B9B9B] text-[16px] self-center font-semibold">
              User Fullname :{" "}
              <span className="font-extrabold text-[20px] tracking-wide text-white font-mono">
                {fullName}
              </span>
            </p>
          </div>
          <div onClick={handleLogOut}>
            <Share />
          </div>
        </div>
      </div>
    </>
  );
};

export default Nav;
