import { useState } from "react";

export default function Chat() {
  const [code, setCode] = useState("");
  const [result, setResult] = useState("");

  const send = async () => {
    const res = await fetch("http://127.0.0.1:8000/generate-tests", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ code }),
    });

    const data = await res.json();
    setResult(data.tests);
  };

  return (
    <div className="chat">
      
      {/* messages */}
      <div className="messages">
        
        <div className="bubble user">
          {code || "Paste Java code..."}
        </div>

        {result && (
          <div className="bubble ai">
            <pre>{result}</pre>
          </div>
        )}

      </div>

      {/* input bar */}
      <div className="inputBar">
        <textarea
          placeholder="Paste Java code..."
          onChange={(e) => setCode(e.target.value)}
        />

        <button onClick={send}>
          Generate
        </button>
      </div>

    </div>
  );
}