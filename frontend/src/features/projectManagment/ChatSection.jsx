/* eslint-disable react/prop-types */
import { useState } from "react";
import { SendHorizontal } from "lucide-react";
import { useSelector } from "react-redux";

const ChatSection = ({ messages, setMessages }) => {
  const [message, setMessage] = useState("");
  const darkMode = useSelector((state) => state.darkMode.darkMode);
  const handleSendMessage = () => {
    if (message.trim()) {
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          text: message,
          sender: "You",
          time: new Date().toLocaleTimeString(),
          align: "end",
        },
      ]);
      setMessage("");
    }
  };

  return (
    <div
      className={`p-4 shadow rounded-3xl container h-screen flex flex-col border-2 ${
        darkMode ? "border-dark-primary" : "border-light-primary"
      }`}
    >
      <h2 className="text-xl font-bold mb-4">Project Chat</h2>
      
      {/* Chat messages */}
      <div className="flex-grow overflow-y-auto space-y-4 custom-scrollbar">
        {messages.map((msg, index) => (
          <div key={index} className={`chat chat-${msg.align}`}>
            <div className="chat-image avatar">
              <div className="w-10 rounded-full">
                <img
                  alt="Chat bubble"
                  src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                />
              </div>
            </div>
            <div className="chat-header">
              {msg.sender}
              <time className="text-xs opacity-50 ml-2">{msg.time}</time>
            </div>
            <div className="chat-bubble">{msg.text}</div>
            <div className="chat-footer opacity-50">Delivered</div>
          </div>
        ))}
      </div>

      {/* Input box for sending messages */}
      <div className="mt-4 flex items-center">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message..."
          className={`flex-grow input input-bordered rounded-xl mr-4 ${
            darkMode
              ? "bg-dark-bg text-dark-primary border-dark-primary"
              : "bg-light-bg text-light-primary border-light-primary"
          }`}
        />
        <button
          onClick={handleSendMessage}
          className={`btn rounded-xl ${
            darkMode
              ? "bg-dark-primary text-dark-bg hover:bg-dark-pHover"
              : "bg-light-primary text-light-bg hover:bg-light-pHover"
          }`}
          disabled={!message.trim()}
        >
          <SendHorizontal />
        </button>
      </div>
    </div>
  );
};

export default ChatSection;
