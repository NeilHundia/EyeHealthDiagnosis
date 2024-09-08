import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from './Navbar';
import './PatientDetailsStyle.css';

const PatientDetails = () => {
  const { id } = useParams();
  const [patient, setPatient] = useState(null);
  const [diagnosis, setDiagnosis] = useState('');

  useEffect(() => {
    const patientsData = JSON.parse(localStorage.getItem('patientsData')) || [];
    const selectedPatient = patientsData.find(p => p.id === parseInt(id));
    if (selectedPatient) {
      setPatient(selectedPatient);
      setDiagnosis(selectedPatient.diagnosis || '');
    }
  }, [id]);

  const handleDiagnosisChange = (e) => {
    setDiagnosis(e.target.value);
  };

  const handleDiagnosisSubmit = () => {
    const patientsData = JSON.parse(localStorage.getItem('patientsData')) || [];
    const updatedPatients = patientsData.map(p => {
      if (p.id === parseInt(id)) {
        return { ...p, diagnosis };
      }
      return p;
    });
    localStorage.setItem('patientsData', JSON.stringify(updatedPatients));
    // alert('Diagnosis saved!');
  };

  if (!patient) return <div>Loading...</div>;

  return (
    <div>
      <Navbar />
      <div className="patient-details">
        <h1>{patient.name}</h1>
        <img src={patient.image} alt={patient.name} width="200" height="200" />

        <p>Email: {patient.email}</p>
        <p>Phone: {patient.phone}</p>
        <p>Date of Birth: {patient.dob}</p>
        <p>Gender: {patient.gender}</p>
        <h2>Cropped Eyes</h2>
        <div className="cropped-eyes">
          {(patient.croppedEyes || []).map((eye, index) => (
            <img className='croppedimg' key={index} src={`data:image/png;base64,${eye}`} alt={`Eye ${index}`} />
          ))}
        </div>
        <div className="diagnosis">
          <h2>Diagnosis</h2>
          <textarea
            value={diagnosis}
            onChange={handleDiagnosisChange}
            rows="4"
            cols="50"
          ></textarea>
          <br />
          <button onClick={handleDiagnosisSubmit}>Save Diagnosis</button>
          <button>Save as PDF</button>
        </div>
      </div>
    </div>
  );
};

export default PatientDetails;
