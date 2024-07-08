import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState, useRef } from "react";
import { IoSend } from "react-icons/io5";
import { sendMessage, setClicked } from "../hooks/conversationSlice";
import { sendMessageApi } from "../api/conversationApi";
import { getAllMessages } from "../hooks/Fetcher";
import { io } from "socket.io-client";
import { IoArrowBackSharp } from "react-icons/io5";

const formatTime = (timestamp: any) => {
  const date = new Date(timestamp);

  return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
};

export const Chat = () => {
  const selected = useSelector((state: any) => state?.user?.user);
  const dispatch = useDispatch();
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<any[]>([]);
  const messageEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef: any = useRef<HTMLDivElement>(null);

  const socket = useRef(io("http://localhost:3434")).current;

  const user = useSelector((state: any) => state?.auth?.user?.data);
  // console.log(user);

  useEffect(() => {
    if (user?._id) {
      socket.emit("joinRoom", user._id);
    }
  }, [user, socket]);

  const handleSendMessage = () => {
    if (message.trim()) {
      const data = {
        id: selected?._id,
        _id: user?._id,
        message,
        participant: [user?._id, selected?._id],
        updatedAt: new Date().toISOString(),
      };
      sendMessageApi(data).then((res: any) => {
        dispatch(sendMessage(data));
        socket.emit("sendMessage", data);
        setMessages((prevMessages) => [...prevMessages, data]);
      });

      setMessage("");
    }
  };

  const { data } = getAllMessages({ id: selected?._id, _id: user?._id });
  console.log(data, "data");

  useEffect(() => {
    socket.on("receiveMessage", (newMessage) => {
      if (
        newMessage.participant.includes(user?._id) &&
        newMessage.participant.includes(selected?._id)
      ) {
        setMessages((prevMessages) => [...prevMessages, newMessage]);

        // Add shake effect
        if (chatContainerRef.current) {
          chatContainerRef.current.classList.add("shake");
          setTimeout(() => {
            chatContainerRef.current.classList.remove("shake");
          }, 500);
        }
      }
    });

    return () => {
      socket.off("receiveMessage");
    };
  }, [socket, user, selected]);

  useEffect(() => {
    setMessages(data || []);
  }, [data]);

  useEffect(() => {
    if (messageEndRef.current) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSendMessage();
    }
  };

  return (
    <div className="bg-[#111b21] w-full h-screen flex flex-col">
      {!selected ? (
        <div className="flex-1 flex justify-center items-center">
          <h1 className="text-[30px] text-gray-500 ">Select a user to chat</h1>
        </div>
      ) : (
        <>
          <div className="w-full h-[60px] bg-[#202c32] flex items-center justify-between">
            <div className="flex gap-3 items-center text-white pl-4">
              <div className="w-[40px] h-[40px] rounded-full overflow-hidden">
                <img
                  src={selected?.avatar}
                  alt="avatar"
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="text-[14px]">{selected?.userName}</p>
            </div>
            <div
              className="sm:hidden"
              onClick={() => {
                dispatch(setClicked(false));
              }}
            >
              <IoArrowBackSharp className="text-[20px] text-white pr-1" />
            </div>
          </div>

          <div className="flex-1 w-full flex flex-col items-center overflow-y-auto p-4">
            <div className="w-full flex flex-col gap-3 mt-3">
              {!messages.length ? (
                <p className="text-[14px]  text-gray-500 w-full flex justify-center">
                  You can now chat with {selected?.userName}
                </p>
              ) : (
                messages?.map((msg: any, index: number) => (
                  <div
                    key={index}
                    className={`max-w-[45%] p-3 rounded-lg relative message-bubble ${
                      user?._id === msg?.participant?.[0]
                        ? "self-end max-w-[50%] p-3 bg-green-900 text-white rounded-lg relative message-bubble sent flex gap-1 flex-col"
                        : "self-start max-w-[50%] p-3 bg-[#202c32] text-white rounded-lg relative message-bubble flex gap-1 flex-col"
                    } text-white`}
                    ref={chatContainerRef}
                  >
                    {msg?.message}
                    <div className="text-[11px] text-gray-400  flex self-end ">
                      {formatTime(msg?.updatedAt)}
                    </div>
                  </div>
                ))
              )}
              <div ref={messageEndRef}></div>
            </div>
          </div>

          <div className="w-full max-h-[20%] bg-[#202c32] flex p-3">
            <input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              className="p-2 px-3 bg-[#111b21] text-white outline-none rounded-lg w-full"
              placeholder="Type a message"
            />
            <button
              onClick={handleSendMessage}
              className="ml-3 p-2 text-[#888f9b] text-[19px] rounded-lg"
            >
              <IoSend />
            </button>
          </div>
        </>
      )}
    </div>
  );
};
