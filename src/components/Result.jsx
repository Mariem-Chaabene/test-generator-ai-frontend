export default function Result({ result }) {
  return (
    <div className="result">
      <h3>Generated Tests</h3>
      <pre style={{whiteSpace: "pre-wrap", wordBreak: "break-word", background: "#111", color: "#fff", padding: "10px", borderRadius: "8px", overflowX: "auto"}}>
        {result}
      </pre>
    </div>
  );
}

