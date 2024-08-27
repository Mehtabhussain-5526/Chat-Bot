import React, { useRef } from "react";
import { Mic, Send, Logo } from "./Graphics";
import axios from "axios";
import { useState, useEffect } from "react";
import RecordRTC from "recordrtc";
import InfiniteScroll from "react-infinite-scroll-component";

const PromptInput = () => {
  const [promptEntered, SetPromptEntered] = useState();
  const [Chats, setChats] = useState([]);
  const [isRecording, setIsRecording] = useState(false);
  const [infinitePage, setInfinitePage] = useState(1);
  const [isBlinking, SetIsBlinking] = useState(false);
  const streamRef = useRef(null);
  const promptinputRef = useRef();
  const recorderRef = useRef(null);
  const apiKey = import.meta.env.VITE_ACCESS_KEY;
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${apiKey}`,
  };
  const save = (prompt) => {
    const data = {
      model: "gpt-4-turbo",
      messages: [{ role: "user", content: promptEntered || prompt }],
      max_tokens: 50,
      n: 1,
      stop: null,
      temperature: 0.5,
    };
    promptinputRef.current.value = "";
    promptinputRef.current.focus();
    localStorage.setItem("userprompt", JSON.stringify(promptEntered || prompt));
    axios
      .post(`https://api.openai.com/v1/chat/completions`, data, {
        headers: headers,
      })
      .then((response) => {
        console.log(response.data.choices[0].message.content);
        localStorage.setItem(
          "response",
          JSON.stringify(response.data.choices[0].message.content)
        );
        if (chats) {
          chats.push({
            id: "",
            userinput: promptEntered || prompt,
            systemresponse: response.data.choices[0].message.content,
          });
          setChats([...chats]);
        }
        localStorage.setItem("chats", JSON.stringify(chats));
      })
      .catch((error) => {
        console.error(
          "Error:",
          error.response ? error.response.data : error.message
        );
      });
  };
  const startRecording = async () => {
    streamRef.current = await navigator.mediaDevices.getUserMedia({
      audio: true,
    });
    recorderRef.current = new RecordRTC(streamRef.current, { type: "audio" });
    recorderRef.current.startRecording();
    setIsRecording(true);
    setInterval(() => {
      SetIsBlinking(!isBlinking);
    }, 2000);
  };
  const wisper = async (audio) => {
    if (audio) {
      const formData = new FormData();
      formData.append("file", new File([audio], "audio.wav"));
      formData.append("model", "whisper-1");
      formData.append("response_format", "text");
      try {
        const response = await axios.post(
          "https://api.openai.com/v1/audio/transcriptions",
          formData,
          {
            headers: {
              Authorization: `Bearer ${apiKey}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );
        promptinputRef.current.value = response.data;
        // SetPromptEntered(response.data);
      } catch (error) {
        console.error("Error during transcription:", error);
      }
    }
  };
  const stopRecording = async () => {
    recorderRef.current.stopRecording(() => {
      const audioBlob = recorderRef.current.getBlob();
      setIsRecording(false);
      wisper(audioBlob);
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
        streamRef.current = null;
      }
    });
  };
  const chats =
    localStorage.getItem("chats") && JSON.parse(localStorage.getItem("chats"));

  useEffect(() => {
    if (!chats) {
      localStorage.setItem("chats", JSON.stringify([]));
    }
    setChats(chats?.slice(0, infinitePage * 10) || []);
  }, []);

  useEffect(() => {
    if (promptEntered) {
      save();
    }
  }, [promptEntered]);

  return (
    <>
      <div className="relative max-w-[768px]  text-white mx-auto mb-[50px] mt-[50px] min-h-screen">
        <div className="pb-[100px]">
          <InfiniteScroll
            dataLength={Chats?.length}
            next={() => {
              console.log("next");
              setChats(chats?.slice(0, (infinitePage + 1) * 10));
              setInfinitePage((prev) => prev + 1);
            }}
            hasMore={true}
          >
            {Chats?.map((data, index) => (
              <div key={index} className="">
                <div className=" flex justify-end w-full text-left text-white bg-transparent mt-[30px]">
                  <p className="bg-[#2F2F2F] p-[20px] rounded-xl w-[500px] text-[16px] font-normal leading-6">
                    {data.userinput}
                  </p>
                </div>
                <div className="bg-transparent mt-[20px] flex gap-[20px]">
                  <div className="max-w-[50px] max-h-[50px] rounded-full absolute left-[-70px]">
                    <Logo />
                  </div>
                  <p className="leading-[28px] text-white font-normal text-[16px]">
                    {data.systemresponse}
                  </p>
                </div>
              </div>
            ))}
          </InfiniteScroll>
        </div>
        <div className="absolute bottom-0 w-full">
          <div className="flex items-center justify-center w-full">
            <div className="flex bg-[#2F2F2F] max-w-[768px] w-full rounded-full h-[52px]  items-center px-[15px]">
              <div
                onClick={isRecording ? stopRecording : startRecording}
                className="w-[44px] h-[44px] flex items-center justify-center cursor-pointer"
              >
                <Mic
                  color={`${isRecording && isBlinking ? "#FF0000" : "#fff"}`}
                />
              </div>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  SetPromptEntered(promptinputRef.current.value);
                }}
                className="flex justify-between w-full"
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
