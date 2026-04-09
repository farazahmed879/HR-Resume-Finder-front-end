"use client";

export default function ResumeCard({ resume, index }) {
  const { filename, score, excerpt } = resume;

  // Determine the file type icon
  const getFileIcon = (name) => {
    if (name.endsWith(".pdf")) return "📄";
    if (name.endsWith(".docx") || name.endsWith(".doc")) return "📝";
    return "📃";
  };

  // Determine the file type label
  const getFileType = (name) => {
    const ext = name.split(".").pop().toUpperCase();
    return `${ext} File`;
  };

  // Format the filename for display (remove extension, replace underscores)
  const displayName = filename
    .replace(/\.[^/.]+$/, "")
    .replace(/_/g, " ");

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = `http://localhost:8000/api/download/${encodeURIComponent(filename)}`;
    link.download = filename;
    link.click();
  };

  return (
    <div className="resume-card" id={`resume-card-${index}`}>
      <div className="resume-card-header">
        <div className="resume-card-info">
          <div className="resume-card-icon">{getFileIcon(filename)}</div>
          <div>
            <div className="resume-card-name">{displayName}</div>
            <div className="resume-card-type">{getFileType(filename)}</div>
          </div>
        </div>
        <div className="resume-card-score">
          <div className="resume-card-score-value">{score}%</div>
          <div className="resume-card-score-label">Match</div>
        </div>
      </div>

      <div className="resume-card-score-bar">
        <div
          className="resume-card-score-fill"
          style={{ width: `${Math.min(score, 100)}%` }}
        />
      </div>

      <div className="resume-card-excerpt">{excerpt}</div>

      <div className="resume-card-actions">
        <button className="resume-card-btn primary" onClick={handleDownload}>
          ⬇ Download
        </button>
        <button className="resume-card-btn" onClick={() => navigator.clipboard.writeText(excerpt)}>
          📋 Copy Excerpt
        </button>
      </div>
    </div>
  );
}
