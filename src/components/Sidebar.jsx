import React, { useEffect, useState, useContext } from "react";
import SingleChat from "./SingleChat";
import { NewChat, SidebarToggle } from "./Graphics";
import { auth, db } from "../config/firebase";
import { MyContext } from "../context/context";
import {
  collection,
  addDoc,
  serverTimestamp,
  query,
  where,
  getDocs,
} from "firebase/firestore";

const Sidebar = () => {
  const [chats, setChats] = useState([]);
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

  useEffect(() => {
    const fetchUserChats = async () => {
      try {
        if (user) {
          const q = query(
            collection(db, "chats"),
            where("userId", "==", user.uid)
          );

          const querySnapshot = await getDocs(q);
          const userChats = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));

          setChats(userChats);
        }
      } catch (error) {
        console.error("Error fetching user chats: ", error);
      }
    };

    fetchUserChats();
  }, [user]);

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
        <div className="ml-5 text-white">
          <p className="text-[16px] font-semibold tracking-wider">
            Chat History
          </p>
        </div>
        {chats.map((data, index) => (
          <SingleChat
            id={data.id}
            content={new Date(data.timestamp?.seconds * 1000).toLocaleString()}
          />
        ))}
      </div>
    </>
  );
};

export default Sidebar;
