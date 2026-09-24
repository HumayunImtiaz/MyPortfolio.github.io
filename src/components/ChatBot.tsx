import React, { useState, useEffect, useRef } from "react";
import { FaRobot, FaTimes, FaPaperPlane } from "react-icons/fa";

// Interface for chat message
interface Message {
  role: "user" | "model";
  text: string;
}

const MAX_DAILY_LIMIT = 5;

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "model",
      text: "Hi! I am Humayun's AI Personal Assistant. How can I help you today?",
    },
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [usageCount, setUsageCount] = useState(0);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Load limits on mount
  useEffect(() => {
    const today = new Date().toDateString();
    const savedDate = localStorage.getItem("chat_usage_date");
    const count = localStorage.getItem("chat_usage_count");

    if (savedDate !== today) {
      // New day, reset count
      localStorage.setItem("chat_usage_date", today);
      localStorage.setItem("chat_usage_count", "0");
      setUsageCount(0);
    } else {
      setUsageCount(parseInt(count || "0", 10));
    }
  }, []);

  // Update limit
  const incrementUsage = () => {
    const newCount = usageCount + 1;
    setUsageCount(newCount);
    localStorage.setItem("chat_usage_count", newCount.toString());
  };

  // Auto scroll to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim() || isLoading) return;

    if (usageCount >= MAX_DAILY_LIMIT) {
      setMessages((prev) => [
        ...prev,
        { role: "user", text: inputMessage },
        {
          role: "model",
          text: "Sorry My daily free usage limit is reached . Please reach out to Humayun directly via the contact form or email!",
        },
      ]);
      setInputMessage("");
      return;
    }

    const userText = inputMessage;
    setInputMessage("");
    setMessages((prev) => [...prev, { role: "user", text: userText }]);
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: userText }),
      });

      if (!response.ok) {
        throw new Error(`Server API Error: ${response.statusText}`);
      }

      const data = await response.json();
      const responseText = data.answer || "I'm sorry, I didn't receive a response from the server.";

      setMessages((prev) => [...prev, { role: "model", text: responseText }]);
      incrementUsage();
    } catch (error: any) {
      console.error("Chat API Error:", error?.message || error);
      setMessages((prev) => [
        ...prev,
        {
          role: "model",
          text: "I'm sorry, I'm experiencing a temporary connection issue. Please try again in a moment, or feel free to contact Humayun directly through the contact form!",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-5 right-5 z-50">
      {/* Bot Icon / Toggle Button */}
      {!isOpen && (
        <div className="flex flex-col items-end gap-3 cursor-pointer group" onClick={() => setIsOpen(true)}>
          {/* Welcome Bubble */}
          <div className="bg-gray-800 px-4 py-2 rounded-xl rounded-br-none shadow-xl border border-gray-700 text-sm text-gray-300 font-medium hidden md:block group-hover:-translate-y-1 transition-transform duration-300 relative">
            Ask Humayun's AI Assistant 👋
            <div className="absolute w-3 h-3 bg-gray-800 border-b border-r border-gray-700 bottom-[-7px] right-4 transform rotate-45"></div>
          </div>
          {/* Robot Icon */}
          <button className="bg-designColor w-14 h-14 rounded-full flex items-center justify-center text-gray-900 text-2xl shadow-lg hover:shadow-designColor/50 hover:scale-110 transition-all duration-300">
            <FaRobot />
          </button>
        </div>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="bg-bodyColor w-80 md:w-96 rounded-2xl shadow-2xl border border-gray-800 flex flex-col overflow-hidden animate-fadeIn">
          {/* Header */}
          <div className="bg-gradient-to-r from-bodyColor to-gray-900 px-4 py-3 flex justify-between items-center border-b border-gray-800">
            <div className="flex items-center gap-2">
              <div className="bg-designColor w-8 h-8 rounded-full flex items-center justify-center text-white text-sm">
                <FaRobot />
              </div>
              <div>
                <h3 className="text-lightText font-semibold text-sm">AI Assistant</h3>
                <p className="text-gray-400 text-xs text-left">
                  {usageCount >= MAX_DAILY_LIMIT ? "Limit Reached" : "Online"}
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-400 hover:text-designColor transition-colors"
            >
              <FaTimes />
            </button>
          </div>

          {/* Chat Body */}
          <div className="h-80 p-4 flex flex-col gap-3 overflow-y-auto bg-opacity-50">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"
                  }`}
              >
                <div
                  className={`max-w-[80%] rounded-xl px-4 py-3 text-sm leading-relaxed ${msg.role === "user"
                    ? "bg-designColor text-black font-medium rounded-br-none"
                    : "bg-gray-800 text-gray-200 rounded-bl-none border border-gray-700"
                    }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-gray-800 border border-gray-700 rounded-xl rounded-bl-none px-4 py-2 flex items-center gap-1">
                  <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce delay-100"></div>
                  <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce delay-200"></div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Chat Footer / Input */}
          <form
            onSubmit={handleSendMessage}
            className="p-3 border-t border-gray-800 bg-gray-900 flex items-center gap-2"
          >
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Type your message..."
              disabled={isLoading || usageCount >= MAX_DAILY_LIMIT}
              className="flex-1 bg-gray-800 text-white px-4 py-2 rounded-full text-sm outline-none border border-gray-700 focus:border-designColor transition-colors disabled:opacity-50"
            />
            <button
              type="submit"
              disabled={!inputMessage.trim() || isLoading || usageCount >= MAX_DAILY_LIMIT}
              className="w-10 h-10 flex items-center justify-center bg-designColor text-white rounded-full hover:bg-opacity-80 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <FaPaperPlane className="text-sm" />
            </button>
          </form>

          {/* Footer note */}
          <div className="text-center pb-2 bg-gray-900 text-[10px] text-gray-500">
            {usageCount}/{MAX_DAILY_LIMIT} daily queries used
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatBot;
