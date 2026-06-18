const API_BASE = process.env.REACT_APP_API_URL || 'http://localhost:8000';

export const generateTests = async (code) => {
  try {
    const response = await fetch(`${API_BASE}/generate-tests`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ code })
    });
    
    if (!response.ok) throw new Error('Erreur serveur');
    const data = await response.json();
    return data.tests;
  } catch (error) {
    throw new Error(`Erreur API : ${error.message}`);
  }
};

export const uploadFile = async (file) => {
  try {
    const formData = new FormData();
    formData.append('file', file);
    
    const response = await fetch(`${API_BASE}/upload-java`, {
      method: 'POST',
      body: formData
    });
    
    if (!response.ok) throw new Error('Erreur upload');
    return await response.json();
  } catch (error) {
    throw new Error(`Erreur upload : ${error.message}`);
  }
};
