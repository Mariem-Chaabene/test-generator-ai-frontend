import React, { useState } from 'react';
import CodeEditor from './components/CodeEditor';
import FileUploader from './components/FileUploader';
import ResultViewer from './components/ResultViewer';
import { generateTests, uploadFile } from './services/api';
import './App.css';

function App() {
  const [code, setCode] = useState('');
  const [tests, setTests] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('editor');

  const handleGenerateTests = async () => {
    if (!code.trim()) {
      setError('Veuille entrer du code Java');
      return;
    }
    
    setLoading(true);
    setError('');
    
    try {
      const result = await generateTests(code);
      setTests(result);
      setActiveTab('results');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = async (file) => {
    setLoading(true);
    setError('');
    
    try {
      const result = await uploadFile(file);
      setCode(result.originalCode || '');
      setTests(result.tests);
      setActiveTab('results');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app">
      <header className="header">
        <h1>🧪 AI Test Generator</h1>
        <p>Générez des tests JUnit 5 automatiquement</p>
      </header>

      <div className="tabs">
        <button 
          className={`tab ${activeTab === 'editor' ? 'active' : ''}`}
          onClick={() => setActiveTab('editor')}
        >
          Code
        </button>
        <button 
          className={`tab ${activeTab === 'results' ? 'active' : ''}`}
          onClick={() => setActiveTab('results')}
        >
          Tests Générés
        </button>
      </div>

      {error && <div className="error-banner">{error}</div>}

      <main className="container">
        {activeTab === 'editor' && (
          <div className="editor-section">
            <FileUploader onUpload={handleFileUpload} />
            <CodeEditor code={code} onChange={setCode} />
            <button 
              className="btn-generate"
              onClick={handleGenerateTests}
              disabled={loading}
            >
              {loading ? '⏳ Génération...' : '✨ Générer les Tests'}
            </button>
          </div>
        )}

        {activeTab === 'results' && (
          <ResultViewer tests={tests} loading={loading} />
        )}
      </main>
    </div>
  );
}

export default App;
