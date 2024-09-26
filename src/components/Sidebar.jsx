import React, { useEffect, useState, useContext } from "react";
import SingleChat from "./SingleChat";
import { NewChat, SidebarToggle } from "./Graphics";
import { auth, db } from "../config/firebase";
import { MyContext } from "../context/context";
import { toast, Bounce } from "react-toastify";
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
import { Oval } from "react-loader-spinner";
import { data } from "autoprefixer";

const Sidebar = () => {
  const [chats, setChats] = useState([]);
  const [loading, setLoading] = useState(false);
  const {
    setSharedVar,
    sharedVar,
    isCollapsed,
    setIsCollapsed,
    contextStateArray,
    setContextStateArray,
  } = useContext(MyContext);
  const user = auth.currentUser;
  const localId = Date.now();

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
                localId: localId,
                timestamp: serverTimestamp(),
              };
              const docRef = await addDoc(chatsCollectionRef, chatData);
              setSharedVar(docRef.id);
            } catch (error) {
              toast.error("Error Adding Document!", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
                transition: Bounce,
              });
            }
          }
        }
      } catch (error) {
        toast.error("Unexpected Error!", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          transition: Bounce,
        });
      }
    } else {
      try {
        const chatsCollectionRef = collection(db, "chats");
        const chatData = {
          userId: user.uid,
          chatContext: [],
          localId: localId,
          timestamp: serverTimestamp(),
        };
        const docRef = await addDoc(chatsCollectionRef, chatData);
        setSharedVar(docRef.id);
      } catch (error) {
        toast.error("Error Adding Document!", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          transition: Bounce,
        });
      }
    }
  };

  useEffect(() => {
    setContextStateArray([]);
    const fetchUserChats = async () => {
      setLoading(true);
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
          const sortedChats = userChats.sort((a, b) => b.localId - a.localId);
          setLoading(false);
          setChats(sortedChats);
        }
      } catch (error) {
        setLoading(true);
        toast.error("Error Fetching Chats!", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          transition: Bounce,
        });
      }
    };
    fetchUserChats();
  }, [user, sharedVar]);

  const handleToggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

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

        {loading && (
          <div className="flex items-center justify-center w-full mt-5">
            <Oval
              height={40}
              width={40}
              color="#20B2AA"
              visible={true}
              ariaLabel="oval-loading"
              secondaryColor="#4682B4"
              strokeWidth={2}
              strokeWidthSecondary={5}
            />
          </div>
        )}
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
