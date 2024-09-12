import { React } from "react";
import { useNavigate } from "react-router-dom";
import { Share } from "./Graphics";
import { auth } from "../config/firebase";
import { signOut } from "firebase/auth";

const Nav = () => {
  const navigate = useNavigate();
  const handleLogOut = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        navigate("/");
        console.log("Signed out successfully");
      })
      .catch((error) => {
        console.error(error);
      });
  };
  return (
    <>
      <div className=" bg-bgsecondary h-[56px] px-[20px] py-[10px]">
        <div className="flex items-center justify-between w-full">
          <p className="text-[#9B9B9B] text-[24px]">ChatBot</p>
          <div onClick={handleLogOut}>
            <Share />
          </div>
        </div>
      </div>
    </>
  );
};

export default Nav;
