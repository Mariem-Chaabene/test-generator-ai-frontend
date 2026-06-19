export default function Result({ result }) {
  return (
    <div className="result">
      <h3>Generated Tests</h3>
      <pre>{result}</pre>
    </div>
  );
}