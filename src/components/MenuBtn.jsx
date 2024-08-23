import React, { useRef, useState, useEffect } from "react";
import { Share, Edit, Archive, Delete } from "./Graphics";

const MenuBtn = ({ setIsActive, isActive }) => {
  const [show, SetShow] = useState(false);
  const buttonRef = useRef(null);

  const handleClickOutside = (event) => {
    if (buttonRef.current && !buttonRef.current.contains(event.target)) {
      SetShow(false);
    }
  };
  useEffect(() => {
    // Add event listener when component mounts
    document.addEventListener("mousedown", handleClickOutside);

    // Clean up the event listener when component unmounts
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      <div>
        <button
          ref={buttonRef}
          onClick={() => {
            SetShow(!show);
            
            // setIsActive(!isActive)
          }}
          className="inline-flex items-center justify-center bg-bgsecondary"
          type="button"
        >
          <svg
            className="w-5 h-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 16 3"
          >
            <path d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z" />
          </svg>
        </button>
        <div
          className={`absolute z-1000 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600 ${
            show ? "block" : "hidden"
          } `}
        >
          <div className="p-2 bg-[#2F2F2F] rounded-xl">
            <div className="flex justify-center py-2 text-center rounded-md bg-transparent gap-3 hover:bg-[#424242] hover:text-white text-white">
              <div className="flex items-center self-center justify-center">
                {" "}
                <Share />{" "}
              </div>{" "}
              <p className="text-[14px]">Share </p>
            </div>
            <div className="flex justify-center py-2 text-center rounded-md bg-transparent gap-3 hover:bg-[#424242] hover:text-white text-white">
              <div className="flex items-center self-center justify-center">
                {" "}
                <Edit />{" "}
              </div>{" "}
              <p className="text-[14px]">Rename </p>
            </div>
            <div className="flex justify-center py-2 text-center rounded-md bg-transparent gap-3 hover:bg-[#424242] hover:text-white text-white">
              <div className="flex items-center self-center justify-center">
                {" "}
                <Archive />{" "}
              </div>{" "}
              <p className="text-[14px]">Archive </p>
            </div>
            <div className="flex justify-center py-2 text-center rounded-md bg-transparent gap-3 hover:bg-[#424242] hover:text-white text-red-500">
              <div className="flex items-center self-center justify-center">
                {" "}
                <Delete />{" "}
              </div>{" "}
              <p className="text-[14px]">Delete </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MenuBtn;
