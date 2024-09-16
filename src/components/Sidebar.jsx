import React, { useContext } from "react";
import SingleChat from "./SingleChat";
import { NewChat, SidebarToggle } from "./Graphics";
import { auth, db } from "../config/firebase";
import { MyContext } from "../context/context";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

const Sidebar = () => {
  const { setSharedVar } = useContext(MyContext);

  const user = auth.currentUser;

  const newChathandle = async () => {
    try {
      const chatsCollectionRef = collection(db, "chats");

      const chatData = {
        userId: user.uid,
        chatContext: [],
        timestamp: serverTimestamp(),
      };

      const docRef = await addDoc(chatsCollectionRef, chatData);
      setSharedVar(docRef.id);
    } catch (error) {
      console.error("Error adding chat document: ", error);
    }
  };
  return (
    <>
      <div className="bg-bgprimary h-full w-[250px] px-[8px]">
        <div className="w-full h-[56px] flex justify-center items-center">
          <div className="flex items-center justify-between w-full p-2">
            <div className="cursor-pointer">
              <SidebarToggle />
            </div>
            <div onClick={newChathandle} className="cursor-pointer">
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
