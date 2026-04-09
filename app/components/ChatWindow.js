"use client";

import { useRef, useEffect } from "react";
import ResumeCard from "./ResumeCard";

export default function ChatWindow({ messages, isTyping, onSuggestionClick }) {
  const bottomRef = useRef(null);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const suggestions = [
    "Find React developers with 3+ years experience",
    "Show me data scientists with Python skills",
    "Look for project managers with PMP certification",
    "Search for UI/UX designers",
    "Find DevOps engineers with AWS experience",
  ];

  // Format time
  const formatTime = (date) => {
    return new Date(date).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Show welcome screen if no messages
  if (messages.length === 0 && !isTyping) {
    return (
      <div className="chat-window" id="chat-window">
        <div className="welcome-screen">
          <div className="welcome-icon">🔍</div>
          <h2 className="welcome-title">
            Welcome to <span className="welcome-title-gradient">ResumeAI</span>
          </h2>
          <p className="welcome-subtitle">
            Your intelligent HR assistant. Describe the candidate you&apos;re looking
            for, and I&apos;ll find the best matching resumes from your database.
          </p>
          <div className="welcome-suggestions">
            {suggestions.map((suggestion, i) => (
              <button
                key={i}
                className="welcome-suggestion"
                onClick={() => onSuggestionClick(suggestion)}
                id={`suggestion-${i}`}
              >
                {suggestion}
              </button>
            ))}
          </div>
        </div>
        <div ref={bottomRef} />
      </div>
    );
  }

  return (
    <div className="chat-window" id="chat-window">
      {messages.map((msg, index) => (
        <div key={index} className={`chat-message ${msg.role}`}>
          <div className={`message-avatar ${msg.role}`}>
            {msg.role === "user" ? "👤" : "🤖"}
          </div>
          <div className="message-content">
            <div className={`message-bubble ${msg.role}`}>
              {msg.text}
            </div>

            {/* Render resume cards for bot messages with matches */}
            {msg.matches && msg.matches.length > 0 && (
              <div className="resume-cards">
                {msg.matches.map((resume, i) => (
                  <ResumeCard key={i} resume={resume} index={i} />
                ))}
              </div>
            )}

            <span className="message-time">{formatTime(msg.timestamp)}</span>
          </div>
        </div>
      ))}

      {/* Typing indicator */}
      {isTyping && (
        <div className="typing-indicator">
          <div className="message-avatar bot">🤖</div>
          <div className="typing-dots">
            <div className="typing-dot"></div>
            <div className="typing-dot"></div>
            <div className="typing-dot"></div>
          </div>
        </div>
      )}

      <div ref={bottomRef} />
    </div>
  );
}
