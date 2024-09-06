import React from "react";
import Sidebar from "./Sidebar";
import Nav from "./Nav";
import PromptInput from "./PromptInput";


const MainContentDiv = () => {
  return (
    <>
      <div className="flex min-h-screen">
        <div className="w-full">
          <div className="fixed top-0 z-10 w-full max-w-[1440px] bg-bgsecondary">
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
