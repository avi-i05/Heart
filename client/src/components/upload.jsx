import { useState } from 'react';
import axios from 'axios';

export default function ReportUpload() {
  const [file, setFile] = useState(null);
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) return alert('Please select a file');

    setLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append('report', file);

    try {
      const response = await axios.post(
        'https://your-backend.com/api/upload-report',
        formData,
        {
          headers: { 'Content-Type': 'multipart/form-data' },
        }
      );
      setPrediction(response.data.prediction);
    } catch (err) {
      setError('Failed to process report');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload} disabled={loading}>
        {loading ? 'Processing...' : 'Upload Report'}
      </button>
      {prediction !== null && <p>Prediction: {prediction}</p>}
      {error && <p style={{color:'red'}}>{error}</p>}
    </div>
  );
}
