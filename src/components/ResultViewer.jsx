import React, { useState } from 'react';
import './ResultViewer.css';

function ResultViewer({ tests, loading }) {
  const [showNotification, setShowNotification] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(tests).then(() => {
      setShowNotification(true);
      setTimeout(() => setShowNotification(false), 3000);
    });
  };

  const handleDownload = () => {
    const element = document.createElement('a');
    element.setAttribute(
      'href',
      'data:text/plain;charset=utf-8,' + encodeURIComponent(tests)
    );
    element.setAttribute('download', 'GeneratedTests.java');
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  if (loading) {
    return (
      <div className="loading">
        <div className="loading-text">Génération en cours...</div>
        <div className="loading-subtext">Veuillez patienter</div>
      </div>
    );
  }

  if (!tests) {
    return (
      <div className="empty-state">
        <p>Aucun test généré. Commencez par soumettre du code.</p>
      </div>
    );
  }

  return (
    <div className="result-viewer">
      <div className="result-toolbar">
        <button onClick={handleCopy} className="btn-action">
          📋 Copier
        </button>
        <button onClick={handleDownload} className="btn-action">
          ⬇️ Télécharger
        </button>
      </div>
      <pre className="result-code">{tests}</pre>
      {showNotification && (
        <div className="copy-notification">✅ Copié dans le presse-papiers !</div>
      )}
    </div>
  );
}

export default ResultViewer;
