import { useState } from "react";
import Sidebar from "./components/Sidebar";
import Editor from "./components/Editor";
import Result from "./components/Result";
import "./App.css";

function App() {
  const [code, setCode] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const generateTests = async () => {
    if (!code) return;

    setLoading(true);

    const res = await fetch("http://127.0.0.1:8000/generate-tests", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ code }),
    });

    const data = await res.json();
    setResult(data.tests);
    setLoading(false);
  };

  return (
    <div className="app">
      <Sidebar />

      <div className="main">
        <h1>AI Unit Test Generator</h1>

        <div className="workspace">
          <Editor code={code} setCode={setCode} />

          <div className="actions">
            <button onClick={generateTests}>
              {loading ? "Generating..." : "Generate Tests"}
            </button>
          </div>

          <Result result={result} />
        </div>
      </div>
    </div>
  );
}

export default App;