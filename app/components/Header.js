"use client";

export default function Header({ onToggleSidebar }) {
  return (
    <header className="header" id="app-header">
      <div className="header-left">
        <button className="header-menu-btn" onClick={onToggleSidebar} id="menu-toggle-btn">
          ☰
        </button>
        <h1 className="header-title">Resume Search</h1>
        <span className="header-badge">AI Powered</span>
      </div>

      <div className="header-right">
        <div className="header-status">
          <span className="header-status-dot"></span>
          Online
        </div>
        <div className="header-avatar" id="user-avatar" title="HR Admin">
          HR
        </div>
      </div>
    </header>
  );
}
