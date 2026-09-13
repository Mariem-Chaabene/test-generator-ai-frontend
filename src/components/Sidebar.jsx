import { FiPlus, FiClock } from "react-icons/fi";

export default function Sidebar({ conversationCount = 0 }) {
  return (
    <div className="sidebar">
      <h2>⚡Test Generator</h2>

      <div className="guest-status">
        <span className="guest-status-title">Mode invité</span>
        <span className="guest-status-count"> {conversationCount}/5 conversations </span>
      </div>
      <div className="menu">
        <button className="menu-item"> <FiPlus /> <span>Nouveau chat</span> </button>
        <button className="menu-item"> <FiClock /> <span>History</span> </button>
      </div>
    </div>
  );
}