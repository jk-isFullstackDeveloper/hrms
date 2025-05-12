import React, { useEffect, useRef, useState } from "react";
import { Paperclip, Send, MessageSquareText, Users } from "lucide-react";
import { getGroupMessages, getPrivateMessages } from "../../api/message";

import Voice from "../call/voice";
import Video from "../call/video";

const ChatWindow = ({ currentUserId, selectedUsers, roomId }) => {
  const scrollRef = useRef(null);
  const [showTooltip, setShowTooltip] = useState(false);
  const [socket, setSocket] = useState(null);
  const [message, setMessage] = useState("");
  const [typing, setTyping] = useState(null);
  const [chat, setChat] = useState([]);

  const sendMessage = () => {
    if (socket && message) {
      if (selectedUsers?.type === "user") {
      } else {
      }

      setChat((prev) => [
        ...prev,
        { content: message, senderId: currentUserId },
      ]);
      setMessage("");
    }
  };

  const handleTyping = () => {};

  const handleStopTyping = () => {};

  let typingTimeout;

  const onTextChange = (e) => {
    setMessage(e.target.value);
    handleTyping();

    clearTimeout(typingTimeout);
    typingTimeout = setTimeout(() => {
      handleStopTyping();
    }, 1000);
  };

  useEffect(() => {
    getDbMessage();
  }, [selectedUsers?._id]);
  const getDbMessage = async () => {
    if (selectedUsers?.type === "user") {
      const res = await getPrivateMessages(currentUserId, selectedUsers?._id);
      setChat(res.data);
    }
    if (selectedUsers?.type === "group") {
      const res = await getGroupMessages(selectedUsers?._id);
      setChat(res.data);
    }
  };

  return (
    <div className="flex-1 flex flex-col   ">
      {selectedUsers ? (
        <>
          {/* Chat Header */}
          <div className="flex justify-between items-center p-4 border-b bg-violet-500">
            <div className="flex items-center gap-3">
              <button className="md:hidden text-gray-600" onClick={() => false}>
                ☰
              </button>
              {selectedUsers?.type === "user" ? (
                <>
                  <img
                    className="w-10 h-10 rounded-full ring ring-round-4"
                    src={"https://i.pravatar.cc/100?img=10"}
                    alt={selectedUsers?.name}
                  />
                  <div>
                    <h3 className="text-sm  text-white font-semibold">
                      {selectedUsers?.email}
                    </h3>
                    <p className="capitalize text-xs text-white">
                      {/* {selectedUsers?.online ? "Online" : "Offline"} */}
                      {selectedUsers?.role}{" "}
                      {typing && (
                        <span className="text-[12px] text-emerald-400">
                          Typing...
                        </span>
                      )}
                    </p>
                  </div>
                </>
              ) : (
                <>
                  <div
                    onClick={() => setShowTooltip(true)}
                    className=" cursor-pointer flex items-center justify-around gap-2 w-8 h-8 rounded-full ring ring-white"
                  >
                    <Users className="w-5 h-5 text-white" />
                  </div>
                  <div className="relative inline-block">
                     
                  </div>
                  <div>
                    <h3 className="text-sm  text-white font-semibold">
                      {selectedUsers?.name}
                    </h3>
                    <p className="text-[10px] capitalize text-white truncate">
                      {selectedUsers?.type === "group" &&
                        "Group Members " + selectedUsers.members.length}
                    </p>
                    <p className="capitalize text-xs text-white">
                      {/* {selectedUsers?.online ? "Online" : "Offline"} */}
                      {selectedUsers?.role}{" "}
                      {typing && (
                        <span className="text-[12px] text-lime-100">
                          Typing...
                        </span>
                      )}
                    </p>
                  </div>
                </>
              )}
            </div>
            <div className="flex gap-4">
              <Voice />
              <Video />
            </div>
          </div>
          {/* Chat Messages */}
          <div className="flex-1 p-4 overflow-y-auto h-[65vh] bg-white">
            {chat.map((msg, index) => (
              <div
                key={index}
                className={`flex items-end gap-2 px-4 ${
                  msg.senderId === currentUserId
                    ? "justify-end"
                    : "justify-start"
                } mb-6`}
              >
                {/* Left-side avatar (received messages) */}
                {msg.senderId !== currentUserId && (
                  <img
                    src={msg.senderImage || "https://i.pravatar.cc/100?img=10"}
                    alt="Sender"
                    className="w-9 h-9 ring ring-violet-200 rounded-full shadow-md border border-gray-200"
                  />
                )}

                {/* Chat bubble */}

                <div
                  className={`max-w-[60%]  p-3 max-w-xs break-words rounded-2xl text-sm leading-relaxed shadow-sm ${
                    msg.senderId === currentUserId
                      ? "bg-gray-200 text-xs   text-gray-900 rounded-br-md"
                      : "bg-gray-200 text-xs text-gray-900 rounded-bl-md"
                  }`}
                >
                  {/* Text Message */}
                  {msg.content && <p>{msg.content}</p>}

                  {/* Image Message */}
                  {msg.imageUrl && (
                    <img
                      src={msg.imageUrl}
                      alt="chat-img"
                      className="mt-2 rounded-lg max-h-64 w-full object-cover border border-gray-300"
                    />
                  )}
                </div>

                {/* Right-side avatar (sent messages) */}
                {msg.senderId === currentUserId && (
                  <img
                    src={
                      msg.senderImage ||
                      "https://i.pravatar.cc/100?u=Jitendra Kumar 18"
                    }
                    alt="You"
                    className="w-9 h-9 rounded-full ring ring-violet-200 shadow-md border border-gray-200"
                  />
                )}
              </div>
            ))}
            <div ref={scrollRef} />
          </div>
          {/* Chat Input */}
          <div className="p-3 border-t flex items-center bg-violet-500">
            <button className="text-gray-600 hover:text-blue-500 mr-3">
              <Paperclip color="white" size={18} />
            </button>
            <input
              value={message}
              onChange={(e) => onTextChange(e)}
              type="text"
              placeholder="Type a message..."
              className="flex-1 border p-2 rounded-lg outline-none"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  sendMessage();
                }
              }}
            />
            <button
              onClick={sendMessage}
              className="text-gray-600 hover:text-blue-500 ml-3"
            >
              <Send color="white" size={18} />
            </button>
          </div>
        </>
      ) : (
        <div className="flex flex-col items-center justify-center h-screen text-gray-500">
          <MessageSquareText size={100} className="text-gray-300" />
          <p className="text-xs mt-2">Select a chat to start messaging</p>
        </div>
      )}
    </div>
  );
};
export default ChatWindow;
