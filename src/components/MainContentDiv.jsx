import React from "react";
import Sidebar from "./Sidebar";
import Nav from "./Nav";
import PromptInput from "./PromptInput";

const MainContentDiv = () => {
  return (
    <>
      <div className="flex min-h-screen">
        <div className="z-50">
          <Sidebar />
        </div>
        <div className="relative w-full">
          <div className="sticky top-0 z-10 w-[100%] bg-bgsecondary">
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
