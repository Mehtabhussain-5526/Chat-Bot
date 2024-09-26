import React from "react";
import { useState, useRef, useContext } from "react";
import { MyContext } from "../context/context";

const SingleChat = ({ ...props }) => {
  const { setSharedVar } = useContext(MyContext);
  const { id, content } = props;
  const docIdRefForDataFetch = useRef();

  const handlepastchatid = () => {
    setSharedVar(docIdRefForDataFetch.current.id);
  };

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
    </div>
  );
};

export default SingleChat;
