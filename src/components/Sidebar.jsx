import React from "react";
import SingleChat from "./SingleChat";
import { NewChat, SidebarToggle } from "./Graphics";

const Sidebar = () => {
  return (
    <>
      <div className="bg-bgprimary h-full w-[250px] px-[8px]">
        <div className="w-full h-[56px] flex justify-center items-center">
          <div className="flex items-center justify-between w-full p-2">
            <div className="cursor-pointer">
              <SidebarToggle />
            </div>
            <div className="cursor-pointer">
              <NewChat />
            </div>
          </div>
        </div>
        <SingleChat />
      </div>
    </>
  );
};

export default Sidebar;
