import React   from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Homepage from './Components/Homepage';
import Doclogin from './Components/Doclogin';
import OpLogin from './Components/OpLogin';
import Opdetails from './Components/Opdetails';
import Docdash from './Components/Docdash';
import Operatordash from './Components/Operatordash';
import ImageCapture from './Components/ImageCapture';
import PatientDetails from './Components/Patientdets';


const App = () => {

  return (
    <Router>
      <div className="app-container">
        <Routes>
          <Route path="/" element={<Homepage/>} />
          <Route path="/login" element={<Doclogin/>} />
          <Route path="/Oplogin" element={<OpLogin/>} />
          <Route path="/homepage" element={<Homepage/>} />
          <Route path="/opdets" element={<Opdetails/>} />
          <Route path="/docdash" element={<Docdash/>} />
          <Route path="/opdash" element={<Operatordash/>} />
          <Route path="/imgcapture" element={<ImageCapture/>} />
          <Route path="/patient/:id" element={<PatientDetails />} />

          <Route path='/neilhundia' component={() => {window.location.href = 'https://neilhundia.github.io/Portfolio/';return null;}}/>
        </Routes>
      </div>
    </Router>
  );
};

export default App;
