import { Mic, Send, Logo } from "./Graphics";
import axios from "axios";
import { React, useState, useEffect, useRef, useContext } from "react";
import RecordRTC from "recordrtc";
import InfiniteScroll from "react-infinite-scroll-component";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { materialDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { auth } from "../config/firebase";
import {
  collection,
  doc,
  getDoc,
  addDoc,
  query,
  where,
  updateDoc,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../config/firebase";
import { MyContext } from "../context/context";
import { Oval } from "react-loader-spinner";
import { toast, Bounce } from "react-toastify";

const PromptInput = () => {
  const [promptEntered, SetPromptEntered] = useState();
  const [stream, setStream] = useState("");
  const [isrecording, setisrecording] = useState(false);
  const [loading, setLoading] = useState(false);
  const streamRef = useRef(null);
  const streamTerminator = useRef();
  const recorderRef = useRef(null);
  const chatEndRef = useRef(null);
  const promptinputRef = useRef();
  const {
    authenticated,
    contextStateArray,
    setContextStateArray,
    isCollapsed,
    setSharedVar,
    sharedVar,
  } = useContext(MyContext);
  const apiKey = import.meta.env.VITE_ACCESS_KEY;
  const user = auth.currentUser;
  const localId = Date.now();

  const newChathandle = async () => {
    try {
      const chatsCollectionRef = collection(db, "chats");

      const chatData = {
        userId: user.uid,
        chatContext: contextStateArray,
        localId: localId,
        timestamp: serverTimestamp(),
      };

      const docRef = await addDoc(chatsCollectionRef, chatData);

      setSharedVar(docRef.id);
    } catch (error) {
      toast.error("Failed to Save Chat!", {
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

  const handleInputRequest = () => {
    setLoading(true);
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
        // console.log("No such document!");
      }
    } catch (error) {
      console.error("Error getting document:", error);
    }
  };

  const storeChatData = async (chatContext) => {
    if (sharedVar) {
      try {
        const existingDocRef = doc(db, "chats", sharedVar);
        const chatData = {
          chatContext: chatContext,
        };
        const docRef = await updateDoc(existingDocRef, chatData);
        setSharedVar(sharedVar);
      } catch (error) {
        toast.error("Updating Error!", {
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

  const save = async (prompt) => {
    handleInputRequest();
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
          setLoading(false);
          // console.log("done");
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
              // console.error("Error parsing line:", line, error);
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
      toast.error("Failed to Complete Request!", {
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

  const startRecording = async () => {
    try {
      streamRef.current = await navigator.mediaDevices.getUserMedia({
        audio: true,
      });
      recorderRef.current = new RecordRTC(streamRef.current, { type: "audio" });
      recorderRef.current.startRecording();
      setisrecording(true);
    } catch (error) {
      toast.error("Please Insert Microphone!", {
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
  const wisper = async (audio) => {
    if (audio) {
      const formData = new FormData();
      formData.append("file", new File([audio], "audio.wav"));
      formData.append("model", "whisper-1");
      formData.append("response_format", "text");
      try {
        const response = await axios.post(
          "https://api.trybricks.ai/api/providers/openai/v1/audio/transcriptions",
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
        toast.error("Error during transcription!", {
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
    if (authenticated) {
      if (sharedVar) {
        if (!sharedVar == "") {
          getChatDataById(sharedVar);
        }
      }
      // console.log("shareVar... Running after logging out");
    } else {
      setContextStateArray([]);
    }
  }, [sharedVar]);

  useEffect(() => {
    if (promptEntered) {
      if (promptEntered.trim() !== "") {
        save();
      } else {
        toast.warn("Please Enter a Prompt!", {
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
  }, [promptEntered]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [stream]);

  useEffect(() => {
    if (authenticated) {
      if (contextStateArray.length == 2 || contextStateArray.length >= 2) {
        storeChatData(user.uid, contextStateArray);
      }
      // console.log("contaxarray useeffect... Running after logging out");
    } else {
      setContextStateArray([]);
    }
  }, [contextStateArray]);

  return (
    <>
      <div className="max-w-[1400px] text-white mx-auto mt-[56px] mb-[50px] min-h-full pb-[90px] px-5">
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
        <div
          className={
            !isCollapsed
              ? "fixed left-[250px] bottom-0 md:w-[73.29%] md:left-[250px] lg:w-[80%] lg:left-[250px] xl:w-[83.3%] xxl:w-[90%] xxxl:w-[90%]"
              : "fixed left-[54px] bottom-0 md:w-[96%] md:left-[54px] lg:w-[96%] lg:left-[54px] xl:w-[96.5%] xxl:w-[96.5%] xxxl:w-[98%]"
          }
        >
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
                {loading ? (
                  <Oval
                    height={30}
                    width={30}
                    color="#20B2AA"
                    visible={true}
                    ariaLabel="oval-loading"
                    secondaryColor="#4682B4"
                    strokeWidth={2}
                    strokeWidthSecondary={5}
                  />
                ) : (
                  <button type="submit" className="cursor-pointer">
                    <Send />
                  </button>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PromptInput;
