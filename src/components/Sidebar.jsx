import React, { useEffect, useState, useContext } from "react";
import SingleChat from "./SingleChat";
import { NewChat, SidebarToggle } from "./Graphics";
import { auth, db } from "../config/firebase";
import { MyContext } from "../context/context";

import {
  collection,
  doc,
  getDoc,
  addDoc,
  serverTimestamp,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { data } from "autoprefixer";

const Sidebar = () => {
  const [chats, setChats] = useState([]);
  const { setSharedVar, sharedVar } = useContext(MyContext);
  const {
    isCollapsed,
    setIsCollapsed,
    contextStateArray,
    setContextStateArray,
  } = useContext(MyContext);
  const user = auth.currentUser;

  const newChathandle = async () => {
    if (sharedVar !== "") {
      try {
        const docRef = doc(db, "chats", sharedVar);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          if (data.chatContext.length == 0) {
          } else {
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
          }
        }
      } catch (error) {
        console.error(error);
      }
    } else {
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
    }
  };

  useEffect(() => {
    setContextStateArray([]);
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
  }, [user, sharedVar]);

  const handleToggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  useEffect(() => {
    if (contextStateArray.length > 0) {
      // console.log("Empty or what",contextStateArray)
    }
  }, [user]);

  return (
    <>
      <div
        id="sidebarmaindiv"
        className={
          isCollapsed
            ? "hidden"
            : "block bg-black h-full w-[250px] px-[8px] z-50"
        }
      >
        <div className="w-full h-[56px] flex justify-center items-center">
          <div className="flex items-center justify-between w-full p-2">
            <div onClick={handleToggleSidebar} className="cursor-pointer">
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
          <div id={index}>
            <SingleChat
              id={data.id}
              content={new Date(
                data.timestamp?.seconds * 1000
              ).toLocaleString()}
            />
          </div>
        ))}
      </div>
      {isCollapsed && (
        <div
          onClick={handleToggleSidebar}
          className="flex items-center p-2 ml-2 bg-black rounded-lg cursor-pointer h-14"
        >
          <SidebarToggle />
        </div>
      )}
    </>
  );
};

export default Sidebar;
