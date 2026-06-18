import React from 'react';
import './CodeEditor.css';

function CodeEditor({ code, onChange }) {
  return (
    <div className="code-editor">
      <label>Code Java</label>
      <textarea
        value={code}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Collez votre code Java ici..."
        spellCheck="false"
      />
      <span className="char-count">{code.length} caractères</span>
    </div>
  );
}

export default CodeEditor;
