"use client";

import { useState, useRef } from "react";

export default function ChatInput({ onSendMessage, onUploadFile, isLoading }) {
  const [input, setInput] = useState("");
  const fileInputRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmed = input.trim();
    if (!trimmed || isLoading) return;
    onSendMessage(trimmed);
    setInput("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    onUploadFile(file);
    // Reset file input
    e.target.value = "";
  };

  return (
    <div className="chat-input-container" id="chat-input-container">
      <form className="chat-input-wrapper" onSubmit={handleSubmit}>
        <textarea
          className="chat-input"
          placeholder="Describe the candidate you're looking for..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          rows={1}
          disabled={isLoading}
          id="chat-input"
        />
        <div className="chat-input-actions">
          {/* Upload Button */}
          <input
            type="file"
            ref={fileInputRef}
            className="upload-input"
            accept=".pdf,.docx,.doc,.txt"
            onChange={handleFileChange}
            id="file-upload-input"
          />
          <button
            type="button"
            className="chat-input-btn"
            onClick={() => fileInputRef.current?.click()}
            title="Upload resume"
            id="upload-btn"
          >
            📎
          </button>

          {/* Send Button */}
          <button
            type="submit"
            className="chat-input-btn send"
            disabled={!input.trim() || isLoading}
            title="Send message"
            id="send-btn"
          >
            {isLoading ? "⏳" : "➤"}
          </button>
        </div>
      </form>
      <div className="chat-input-hint">
        Press Enter to send · Shift+Enter for new line · 📎 to upload resumes
      </div>
    </div>
  );
}
