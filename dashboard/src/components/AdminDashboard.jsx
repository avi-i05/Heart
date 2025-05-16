import React, { useEffect, useState } from 'react';
import './AdminDashboard.css';



const AdminDashboard = () => {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState('all')

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/admin/patients');
        if (!res.ok) throw new Error('Failed to fetch patients');
        const data = await res.json();
        setPatients(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchPatients();
  }, []);
  const filteredPatients = patients.filter(patient => {
    if (filter === 'risk') return patient.prediction === 1;
    if (filter === 'no-risk') return patient.prediction === 0;
    return true; 
  });
  const handleLogout = () => {
    localStorage.removeItem('isAdmin');
    window.location.href = '/admin/login';
  };

  return (
    <>
    <nav className="navbar">
  <div className="logo">Your Heart Admin</div>
  <button className="logoutBtn" onClick={handleLogout}>Logout</button>
</nav>


    <div className="dashboard-container">
   
      <h2>Patient Records</h2>

      {/* Filter Buttons */}
      <div className="filter-buttons">
        <button
          className={filter === 'all' ? 'active' : ''}
          onClick={() => setFilter('all')}
        >
          All
        </button>
        <button
          className={filter === 'risk' ? 'active' : ''}
          onClick={() => setFilter('risk')}
        >
          Heart Risk
        </button>
        <button
          className={filter === 'no-risk' ? 'active' : ''}
          onClick={() => setFilter('no-risk')}
        >
          No Risk
        </button>
      </div>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {!loading && filteredPatients.length === 0 && <p>No records found.</p>}

      {!loading && patients.length > 0 && (
        <table>
        <thead>
          <tr>
            <th>Age</th>
            <th>Sex</th>
            <th>CP</th>
            <th>Resting BP</th>
            <th>Chol</th>
            <th>FBS</th>
            <th>Rest ECG</th>
            <th>Thalach</th>
            <th>Exang</th>
            <th>Oldpeak</th>
            <th>Slope</th>
            <th>CA</th>
            <th>Thal</th>
            <th>Prediction</th>
          </tr>
        </thead>
        <tbody>
          {patients.map((patient) => (
            <tr key={patient._id}>
              <td>{patient.age}</td>
              <td>{patient.sex}</td>
              <td>{patient.cp}</td>
              <td>{patient.trestbps}</td>
              <td>{patient.chol}</td>
              <td>{patient.fbs}</td>
              <td>{patient.restecg}</td>
              <td>{patient.thalach}</td>
              <td>{patient.exang}</td>
              <td>{patient.oldpeak}</td>
              <td>{patient.slope}</td>
              <td>{patient.ca}</td>
              <td>{patient.thal}</td>
              <td>{patient.prediction}</td>
            </tr>
          ))}
        </tbody>
      </table>
      
      )}
    </div>
    </>
  );
  
};

export default AdminDashboard;
