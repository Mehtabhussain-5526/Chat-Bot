import React from "react";
import MenuBtn from "./MenuBtn";
import { useState } from "react";

const SingleChat = () => {
  const [showmenu, SetShowmenu] = useState(false);
  const [isActive, setIsActive ] = useState(false);
  const over = () => {
    SetShowmenu(true);
  };
  const beside = () => {
    SetShowmenu(false);
  };
  return (
    <>
      <div   
        
        className="relative flex justify-between items-center  px-[8px] py-[8px] group rounded-lg text-white cursor-pointer text-nowrap hover:bg-bgsecondary mt-[15px] w-full"
      >
        <div>
          <p className="overflow-hidden">Lorem, ipsum dolor sit </p>
        </div>
        <div onClick={() => setIsActive(!isActive)} className={`${isActive ? "" : "group-hover:opacity-100 group-hover:flex opacity-0 block"} flex items-center justify-center`}><MenuBtn isActive={isActive} setIsActive={setIsActive} /></div>
        
      </div>
    </>
  );
};

export default SingleChat;
