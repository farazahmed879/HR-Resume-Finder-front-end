"use client";

import { useState, useCallback, useEffect } from "react";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import ChatWindow from "./components/ChatWindow";
import ChatInput from "./components/ChatInput";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE || "http://localhost:8000";

export default function Home() {
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [resumeCount, setResumeCount] = useState(0);
  const [chatHistory, setChatHistory] = useState([]);
  const [activeChatId, setActiveChatId] = useState(null);
  const [allChats, setAllChats] = useState({});
  const [toast, setToast] = useState(null);

  // Fetch resume count on mount
  useEffect(() => {
    fetchResumeCount();
  }, []);

  const fetchResumeCount = async () => {
    try {
      const res = await fetch(`${API_BASE}/api/resumes`);
      const data = await res.json();
      setResumeCount(data.total || 0);
    } catch {
      console.log("Backend not available yet");
    }
  };

  const showToast = (message, type = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handleSendMessage = useCallback(
    async (text) => {
      // Add user message
      const userMsg = {
        role: "user",
        text,
        timestamp: new Date().toISOString(),
      };

      const updatedMessages = [...messages, userMsg];
      setMessages(updatedMessages);
      setIsTyping(true);

      try {
        const response = await fetch(`${API_BASE}/api/chat`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ query: text }),
        });

        const data = await response.json();

        const botMsg = {
          role: "bot",
          text: data.message,
          matches: data.matches || [],
          timestamp: new Date().toISOString(),
        };

        const finalMessages = [...updatedMessages, botMsg];
        setMessages(finalMessages);
        setResumeCount(data.total_resumes || resumeCount);

        // Update chat history
        const chatId = activeChatId || Date.now().toString();
        if (!activeChatId) {
          setActiveChatId(chatId);
          setChatHistory((prev) => [
            { id: chatId, title: text.slice(0, 40) + (text.length > 40 ? "..." : "") },
            ...prev,
          ]);
        }
        setAllChats((prev) => ({ ...prev, [chatId]: finalMessages }));
      } catch (error) {
        const errorMsg = {
          role: "bot",
          text: "⚠️ Unable to connect to the server. Please make sure the backend is running on port 8000.",
          matches: [],
          timestamp: new Date().toISOString(),
        };
        setMessages([...updatedMessages, errorMsg]);
      } finally {
        setIsTyping(false);
      }
    },
    [messages, activeChatId, resumeCount]
  );

  const handleUploadFile = useCallback(
    async (file) => {
      const formData = new FormData();
      formData.append("file", file);

      try {
        const response = await fetch(`${API_BASE}/api/upload`, {
          method: "POST",
          body: formData,
        });
        const data = await response.json();
        showToast(data.message, "success");
        fetchResumeCount();
      } catch {
        showToast("❌ Failed to upload resume. Is the backend running?", "error");
      }
    },
    []
  );

  const handleNewChat = () => {
    setMessages([]);
    setActiveChatId(null);
  };

  const handleSelectChat = (chatId) => {
    setActiveChatId(chatId);
    setMessages(allChats[chatId] || []);
  };

  const handleSuggestionClick = (suggestion) => {
    handleSendMessage(suggestion);
  };

  return (
    <div className="app-layout" id="app-layout">
      <Sidebar
        resumeCount={resumeCount}
        chatHistory={chatHistory}
        onNewChat={handleNewChat}
        onSelectChat={handleSelectChat}
        activeChatId={activeChatId}
      />

      <div className="main-content">
        <Header />

        <ChatWindow
          messages={messages}
          isTyping={isTyping}
          onSuggestionClick={handleSuggestionClick}
        />

        <ChatInput
          onSendMessage={handleSendMessage}
          onUploadFile={handleUploadFile}
          isLoading={isTyping}
        />
      </div>

      {/* Toast Notification */}
      {toast && (
        <div className={`upload-toast ${toast.type}`}>{toast.message}</div>
      )}
    </div>
  );
}
