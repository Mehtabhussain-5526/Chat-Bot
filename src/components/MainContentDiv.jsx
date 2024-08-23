import React from "react";
import Sidebar from "./Sidebar";
import Nav from "./Nav";
import PromptInput from "./PromptInput";


const MainContentDiv = () => {
  return (
    <>
      <div className="flex w-[1190] min-h-screen">
        <div className="w-[100vw]">
          <div className="z-10 w-full bg-bgsecondary">
            <Nav />
          </div>
          <div className="text-white ">
            <PromptInput />
          </div>
        </div>
      </div>
    </>
  );
};

export default MainContentDiv;
