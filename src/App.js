import Chat from "./components/Chat";
import Sidebar from "./components/Sidebar";
import "./App.css";

export default function App() {
  return (
    <div className="layout">
      <Sidebar />
      <Chat />
    </div>
  );
}