import React, { useRef, useState } from 'react';
import './FileUploader.css';

function FileUploader({ onUpload }) {
  const fileInputRef = useRef(null);
  const [isDragActive, setIsDragActive] = useState(false);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setIsDragActive(true);
    } else if (e.type === 'dragleave') {
      setIsDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);

    const file = e.dataTransfer.files?.[0];
    if (file && file.name.endsWith('.java')) {
      onUpload(file);
    } else {
      alert('Veuillez télécharger un fichier .java valide');
    }
  };

  const handleFileSelect = (e) => {
    const file = e.target.files?.[0];
    if (file && file.name.endsWith('.java')) {
      onUpload(file);
    } else {
      alert('Veuillez sélectionner un fichier .java');
    }
  };

  return (
    <div
      className={`file-uploader ${isDragActive ? 'drag-active' : ''}`}
      onDragEnter={handleDrag}
      onDragLeave={handleDrag}
      onDragOver={handleDrag}
      onDrop={handleDrop}
    >
      <input
        ref={fileInputRef}
        type="file"
        accept=".java"
        onChange={handleFileSelect}
        style={{ display: 'none' }}
      />
      <button onClick={() => fileInputRef.current?.click()}>
        Télécharger un fichier .java
      </button>
      <p>ou glissez-déposez ici</p>
      <small>Fichiers supportés : .java (max 10 MB)</small>
    </div>
  );
}

export default FileUploader;
