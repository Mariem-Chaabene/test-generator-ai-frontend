export default function Editor({ code, setCode }) {
  return (
    <textarea
      className="editor"
      placeholder="Paste Java code here..."
      value={code}
      onChange={(e) => setCode(e.target.value)}
    />
  );
}