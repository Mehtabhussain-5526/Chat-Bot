import { Mic, Send, Logo } from "./Graphics";
import axios from "axios";
import { React, useState, useEffect, useRef, useContext } from "react";
import RecordRTC from "recordrtc";
import InfiniteScroll from "react-infinite-scroll-component";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { materialDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../config/firebase";
import {
  collection,
  doc,
  getDoc,
  addDoc,
  query,
  where,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { db } from "../config/firebase";
import { MyContext } from "../context/context";

const PromptInput = () => {
  const [promptEntered, SetPromptEntered] = useState();
  const [stream, setStream] = useState("");
  const [isrecording, setisrecording] = useState(false);
  const [contextStateArray, setContextStateArray] = useState([]);
  // const [infinitePage, setInfinitePage] = useState(1);
  const { sharedVar } = useContext(MyContext);
  const { setSharedVar } = useContext(MyContext);
  const streamRef = useRef(null);
  const streamTerminator = useRef();
  const recorderRef = useRef(null);
  const chatEndRef = useRef(null);
  const promptinputRef = useRef();
  const apiKey = import.meta.env.VITE_ACCESS_KEY;
  const user = auth.currentUser;

  const newChathandle = async () => {
    try {
      const chatsCollectionRef = collection(db, "chats");

      const chatData = {
        userId: user.uid,
        chatContext: contextStateArray,
        timestamp: serverTimestamp(),
      };

      const docRef = await addDoc(chatsCollectionRef, chatData);

      setSharedVar(docRef.id);
    } catch (error) {
      console.error("Error adding chat document: ", error);
    }
  };

  if (!sharedVar) {
    if (promptEntered == "") {
      newChathandle();
    }
  }

  const getChatDataById = async (data) => {
    try {
      const docRef = doc(db, "chats", data);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        let existingDataOnFirestore = docSnap.data();
        setContextStateArray(existingDataOnFirestore.chatContext);
      } else {
        console.log("No such document!");
      }
    } catch (error) {
      console.error("Error getting document:", error);
    }
  };

  const storeChatData = async (userId, chatContext) => {
    if (sharedVar) {
      try {
        const existingDocRef = doc(db, "chats", sharedVar);

        const chatData = {
          userId: userId,
          chatContext: chatContext,
          timestamp: serverTimestamp(),
        };
        const docRef = await updateDoc(existingDocRef, chatData);
        setSharedVar(sharedVar);
      } catch (error) {
        console.error("Error updating chat document: ", error);
      }
    }
  };

  const save = async (prompt) => {
    if (promptEntered) {
      setContextStateArray((prevState) => [
        ...prevState,
        { role: "user", content: promptEntered || prompt },
      ]);
      promptinputRef.current.value = "";
    }

    const url = `https://api.trybricks.ai/api/providers/openai/v1/chat/completions`;
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: "gpt-4o-mini",
          messages: contextStateArray.concat({
            role: "user",
            content: promptEntered,
          }),
          n: 1,
          max_tokens: 100,
          temperature: 0.5,
          stream: true,
        }),
      });

      setStream("");

      const reader = response.body.getReader();
      const decoder = new TextDecoder("utf-8");
      let accumulatedText = "";
      let assistantResponse = "";

      while (true) {
        const chunk = await reader.read();
        const { done, value } = chunk;
        if (done) {
          setStream("");
          console.log("done");
          break;
        }
        const decodedChunk = decoder.decode(value, { stream: true });
        accumulatedText += decodedChunk;

        const lines = accumulatedText.split("\n");

        for (let i = 0; i < lines.length - 1; i++) {
          const line = lines[i].replace(/^data: /, "").trim();
          if (line) {
            try {
              const parsedLine = JSON.parse(line);
              const { choices } = parsedLine;
              const { delta } = choices[0];
              const { content } = delta;
              if (content) {
                assistantResponse += content;
                setStream((prev) => prev + content);
              }
            } catch (error) {
              console.error("Error parsing line:", line, error);
            }
          }
        }

        accumulatedText = lines[lines.length - 1];
      }
      if (response && promptEntered) {
        setContextStateArray((prevState) => [
          ...prevState,
          { role: "assistant", content: assistantResponse },
        ]);
        SetPromptEntered("");
      }
    } catch (error) {
      console.log("try Error:", error.message);
    }
  };

  const startRecording = async () => {
    streamRef.current = await navigator.mediaDevices.getUserMedia({
      audio: true,
    });
    recorderRef.current = new RecordRTC(streamRef.current, { type: "audio" });
    recorderRef.current.startRecording();
    setisrecording(true);
  };
  const wisper = async (audio) => {
    if (audio) {
      const formData = new FormData();
      formData.append("file", new File([audio], "audio.wav"));
      formData.append("model", "whisper-1");
      formData.append("response_format", "text");
      try {
        const response = await axios.post(
          "https://api.trybricks.ai/api/providers/openai/v1/chat/completions",
          formData,
          {
            headers: {
              Authorization: `Bearer ${apiKey}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );
        promptinputRef.current.value = response.data;
      } catch (error) {
        console.error("Error during transcription:", error);
      }
    }
  };
  const stopRecording = async () => {
    recorderRef.current.stopRecording(() => {
      const audioBlob = recorderRef.current.getBlob();
      setisrecording(false);
      wisper(audioBlob);
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
        streamRef.current = null;
      }
    });
  };

  useEffect(() => {
    if (sharedVar) {
      getChatDataById(sharedVar);
    }
  }, [sharedVar]);

  // setChats(contextStateArray?.slice(0, infinitePage * 10) || []);

  useEffect(() => {
    if (promptEntered) {
      save();
    }
  }, [promptEntered]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [stream]);

  useEffect(() => {
    if (contextStateArray.length == 2 || contextStateArray.length >= 2) {
      storeChatData(user.uid, contextStateArray);
    }
  }, [contextStateArray]);

  return (
    <>
      <div className="relative max-w-[1400px] text-white mx-auto mt-[56px] mb-[50px] min-h-full pb-[90px] px-5">
        <div>
          <div>
            <div>
              {contextStateArray.map((data, index) => (
                <div key={index} className="">
                  {data.role !== "assistant" ? (
                    <div className=" flex justify-end w-full text-left text-white bg-transparent mt-[30px]">
                      <div className="bg-[#2F2F2F] p-[20px] rounded-xl w-[500px] text-[16px] font-normal leading-6">
                        {data.content}
                      </div>
                    </div>
                  ) : (
                    <div className=" bg-transparent mt-[20px] flex items-center gap-[20px]">
                      <div className="max-w-[50px] max-h-[50px] rounded-full ">
                        <Logo />
                      </div>
                      <div className="bg-[#212121] leading-[28px] text-white font-normal text-[16px]">
                        <ReactMarkdown
                          children={data.content}
                          components={{
                            code({
                              node,
                              inline,
                              className,
                              children,
                              ...props
                            }) {
                              const match = /language-(\w+)/.exec(
                                className || ""
                              );
                              return !inline && match ? (
                                <SyntaxHighlighter
                                  style={materialDark}
                                  language={match[1]}
                                  PreTag="div"
                                  {...props}
                                >
                                  {String(children).replace(/\n$/, "")}
                                </SyntaxHighlighter>
                              ) : (
                                <code className={className} {...props}>
                                  {children}
                                </code>
                              );
                            },
                          }}
                        />
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
            {/* <div>
              <InfiniteScroll
                dataLength={Chats?.length}
                next={() => {
                  setChats(chats?.slice(0, (infinitePage + 1) * 10));
                  setInfinitePage((prev) => prev + 1);
                }}
                hasMore={true}
              >
              </InfiniteScroll>
            </div> */}
            <div
              ref={streamTerminator}
              className={`bg-transparent mt-[20px] flex gap-[20px]`}
            >
              <div className="max-w-[44px] max-h-[44px] rounded-full">
                {!stream == "" && <Logo />}
              </div>
              <div className="bg-[#212121] leading-[28px] text-white mb-[50px]">
                <ReactMarkdown
                  children={stream}
                  components={{
                    code({ node, inline, className, children, ...props }) {
                      const match = /language-(\w+)/.exec(className || "");
                      return !inline && match ? (
                        <SyntaxHighlighter
                          style={materialDark}
                          language={match[1]}
                          PreTag="div"
                          {...props}
                        >
                          {String(children).replace(/\n$/, "")}
                        </SyntaxHighlighter>
                      ) : (
                        <code className={className} {...props}>
                          {children}
                        </code>
                      );
                    },
                  }}
                />
              </div>
            </div>
            <div ref={chatEndRef}></div>
          </div>
        </div>
        <div className="fixed bottom-0 max-w-[1150px] w-full">
          <div className="bg-[#212121] pb-5 w-full flex justify-center items-center">
            <div className="flex bg-[#2F2F2F] max-w-[768px] w-full rounded-full h-[52px]  items-center px-[15px]">
              <div
                onClick={isrecording ? stopRecording : startRecording}
                className="w-[44px] h-[44px] flex items-center justify-center cursor-pointer"
              >
                <Mic
                  isrecording={isrecording.toString()}
                  color={`${isrecording ? "#FF0000" : "#fff"}`}
                />
              </div>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  SetPromptEntered(promptinputRef.current.value);
                }}
                className="flex justify-between w-full "
              >
                <input
                  ref={promptinputRef}
                  className="bg-transparent outline-none w-full text-white pl-2 placeholder:text-[#9B9B9B]  placeholder:text-[17px]"
                  placeholder="Prompt Here"
                  type="text"
                />
                <button type="submit" className="cursor-pointer">
                  <Send />
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PromptInput;
