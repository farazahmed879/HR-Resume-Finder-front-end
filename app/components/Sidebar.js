"use client";

export default function Sidebar({ resumeCount, chatHistory, onNewChat, onSelectChat, activeChatId }) {
  return (
    <aside className="sidebar" id="sidebar">
      {/* Brand */}
      <div className="sidebar-brand">
        <div className="sidebar-brand-icon">🧠</div>
        <div className="sidebar-brand-text">
          <div className="sidebar-brand-title">ResumeAI</div>
          <div className="sidebar-brand-subtitle">HR Assistant</div>
        </div>
      </div>

      {/* New Chat Button */}
      <button className="sidebar-new-chat" onClick={onNewChat} id="new-chat-btn">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M8 3v10M3 8h10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
        New Search
      </button>

      {/* Chat History */}
      <div className="sidebar-section-title">Recent Searches</div>
      <div className="sidebar-history-list">
        {chatHistory.length === 0 ? (
          <div className="sidebar-history-item" style={{ cursor: "default", opacity: 0.5 }}>
            💬 No searches yet
          </div>
        ) : (
          chatHistory.map((chat) => (
            <div
              key={chat.id}
              className={`sidebar-history-item ${chat.id === activeChatId ? "active" : ""}`}
              onClick={() => onSelectChat(chat.id)}
            >
              <span>🔍</span>
              <span>{chat.title}</span>
            </div>
          ))
        )}
      </div>

      {/* Stats */}
      <div className="sidebar-stats">
        <div className="sidebar-stats-title">📊 Database Stats</div>
        <div className="sidebar-stats-row">
          <span className="sidebar-stats-label">Resumes</span>
          <span className="sidebar-stats-value">{resumeCount}</span>
        </div>
        <div className="sidebar-stats-row">
          <span className="sidebar-stats-label">Formats</span>
          <span className="sidebar-stats-value">PDF, DOCX, TXT</span>
        </div>
      </div>
    </aside>
  );
}
