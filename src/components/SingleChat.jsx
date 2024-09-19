import React from "react";
import MenuBtn from "./MenuBtn";
import { useState, useRef, useContext } from "react";
import { MyContext } from "../context/context";

const SingleChat = ({ ...props }) => {
  const [showmenu, SetShowmenu] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const { setSharedVar, sharedVar } = useContext(MyContext);
  const { id, content } = props;
  const docIdRefForDataFetch = useRef();

  const handlepastchatid = () => {
    setSharedVar(docIdRefForDataFetch.current.id);
  };
  // const over = () => {
  //   SetShowmenu(true);
  // };
  // const beside = () => {
  //   SetShowmenu(false);
  // };

  return (
    <div
      onClick={handlepastchatid}
      className="relative flex justify-between items-center p-[8px] group rounded-lg text-white cursor-pointer text-nowrap hover:bg-bgsecondary mt-[15px] w-full"
    >
      <div className="">
        <p ref={docIdRefForDataFetch} id={id} className="overflow-hidden">
          {content}
        </p>
      </div>
      {/* <div
          onClick={() => setIsActive(!isActive)}
          className={`${
            isActive
              ? ""
              : "group-hover:opacity-100 group-hover:flex opacity-0 block"
          } flex items-center justify-center`}
        >
          <MenuBtn isActive={isActive} setIsActive={setIsActive} />
        </div> */}
    </div>
  );
};

export default SingleChat;
