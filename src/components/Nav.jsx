import { React, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Share } from "./Graphics";
import { auth } from "../config/firebase";
import { signOut } from "firebase/auth";
import { doc } from "firebase/firestore";
import { db } from "../config/firebase";
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
  fetchUserFullName(user.uid);
  return (
    <>
      <div className=" bg-bgsecondary h-[56px] px-[20px] py-[10px]">
        <div className="flex items-center justify-between w-full">
          <div className="gap-5">
            <p className="text-[#9B9B9B] text-[24px]">ChatBot</p>
            <p className="text-[#9B9B9B] ">{fullName}</p>
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
