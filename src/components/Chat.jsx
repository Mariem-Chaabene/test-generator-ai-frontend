import { useState, useEffect, useRef } from "react";
import Result from "./Result";
import { FaArrowUp, FaPlus, FaRegCopy } from "react-icons/fa";
export default function Chat() {

  const [code, setCode] = useState("");
  const [messages, setMessages] = useState([]);
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [started, setStarted] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState(null);
  const endRef = useRef(null);

  // auto scroll like ChatGPT
  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const copyToClipboard = async (text, index) => {
    try {
      await navigator.clipboard.writeText(text);

      setCopiedIndex(index);

      setTimeout(() => {
        setCopiedIndex(null);
      }, 2000);

    } catch (err) {
      console.error("Copy failed:", err);
    }
  };

  // SEND TEXT
  const send = async () => {

    if (!code.trim()) return;

    if (!started) setStarted(true);

    const userMessage = {
      role: "user",
      type: "code",
      text: code
    };

    setMessages(prev => [...prev, userMessage]);

    const currentCode = code;
    setCode("");

    // RESET textarea height 👇
    requestAnimationFrame(() => {
      const textarea = document.querySelector(".promptInput");
      if (textarea) {
        textarea.style.height = "auto";
      }
    });

    setLoading(true);

    try {

      const res = await fetch("http://127.0.0.1:8000/generate-tests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code: currentCode })
      });

      const data = await res.json();

      setMessages(prev => [
        ...prev,
        { role: "bot", text: data.tests }
      ]);

    } catch (error) {

      setMessages(prev => [
        ...prev,
        { role: "bot", text: "Error while generating tests." }
      ]);

    } finally {
      setLoading(false);
    }
  };


  const downloadUploadedFile = (file) => {
    const url = URL.createObjectURL(file);

    const a = document.createElement("a");
    a.href = url;
    a.download = file.name;
    a.click();

    URL.revokeObjectURL(url);
  };

  // UPLOAD FILE
  const uploadFile = async () => {

    if (!file) {
      alert("Please choose a Java file.");
      return;
    }

    if (!started) setStarted(true);

    const fileMessage = {
      role: "user",
      type: "file",
      text: file.name,
      fileObject: file
    };

    setMessages(prev => [...prev, fileMessage]);

    setLoading(true);

    try {

      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch(
        "http://127.0.0.1:8000/upload-java",
        {
          method: "POST",
          body: formData
        }
      );

      const data = await res.json();

      setMessages(prev => [
        ...prev,
        {
          role: "bot",
          text: data.tests
        }
      ]);

    } catch (error) {

      console.error(error);

      setMessages(prev => [
        ...prev,
        { role: "bot", text: "Error while uploading file." }
      ]);

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`chat ${started ? "active" : ""}`}>

      {/* MESSAGES AREA */}
      <div className="chatBody">

        {messages.map((msg, i) => (
          <div
            key={i}
            className={`message ${msg.role}`}
          >

            {msg.type === "file" ? (

              <div className="fileBlock">
                <span className="fileIcon">📄</span>

                <button
                  className="fileLink"
                  onClick={() => downloadUploadedFile(msg.fileObject)}
                >
                  {msg.text}
                </button>
              </div>

            ) : (

              <div className="codeBlock">

                <div className="codeHeader">
                  <button
                    className="copyButton"
                    onClick={() => copyToClipboard(msg.text, i)}
                  >
                    <FaRegCopy />
                  </button>

                  {copiedIndex === i && (
                    <span className="copiedText">Copied!</span>
                  )}
                </div>

                <pre>{msg.text}</pre>

              </div>

            )}
          </div>
        ))}

        {loading && (
          <div className="message bot">
            Generating tests...
          </div>
        )}

        <div ref={endRef} />

      </div>

      {/* INPUT AREA */}
      <div className="toolbar chatInput">

        <div className="promptBox">

          <label className="iconButton">
            <FaPlus />
            <input
              type="file"
              accept=".java"
              hidden
              onChange={(e) => setFile(e.target.files[0])}
            />
          </label>
				{file && (
					<div className="uploadedFile">
						<span>📄 {file.name}</span>
						<button
							className="removeFile" onClick={() => setFile(null)}> ✕
						</button>
					</div>
				)}
          <textarea
            className="promptInput"
            placeholder="Paste code..."
            value={code}
            rows={1}
            onChange={(e) => {
              setCode(e.target.value);

              e.target.style.height = "auto";
              e.target.style.height = e.target.scrollHeight + "px";
            }}
          />

          <button
            className="sendButton"
            onClick={file ? uploadFile : send}
          >
            <FaArrowUp />
          </button>

        </div>

      </div>

    </div>
  );
}