// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import './DocDashboardStyle.css';
// import Navbar from './Navbar';

// const Docdash = () => {
//   const [waitingPatients, setWaitingPatients] = useState([]);
//   const [diagnosedPatients, setDiagnosedPatients] = useState([]);

//   useEffect(() => {
//     // Mock data with placeholder images
//     const fetchedWaitingPatients = [
//       { id: 1, name: 'John Doe', image: 'https://via.placeholder.com/150' },
//       { id: 2, name: 'Jane Smith', image: 'https://via.placeholder.com/150' },
//     ];
//     const fetchedDiagnosedPatients = [
//       { id: 3, name: 'Alice Johnson', image: 'https://via.placeholder.com/150' },
//     ];

//     setWaitingPatients(fetchedWaitingPatients);
//     setDiagnosedPatients(fetchedDiagnosedPatients);
//   }, []);

//   return (
//     <div>
//        <Navbar/>
//       <div className="doctor-dashboard">
//       <h1>Doctor Dashboard</h1>
//       <div className="patient-lists">
//         <div className="waiting-patients">
//           <h2>Waiting Patients</h2>
//           <ul>
//             {waitingPatients.map((patient) => (
//               <li key={patient.id}>
//                 <Link to={`/patient/${patient.id}`}>
//                   <img src={patient.image} alt={patient.name} width="200" height="200" />
//                   {patient.name}
//                 </Link>
//               </li>
//             ))}
//           </ul>
//         </div>
//         <div className="diagnosed-patients">
//           <h2>Diagnosed Patients</h2>
//           <ul>
//             {diagnosedPatients.map((patient) => (
//               <li key={patient.id}>
//                 <Link to={`/patient/${patient.id}`}>
//                   <img src={patient.image} alt={patient.name} width="200" height="200" />
//                   {patient.name}
//                 </Link>
//               </li>
//             ))}
//           </ul>
//         </div>
//       </div>
//     </div>
//     </div>
//   );
// };

// export default Docdash;

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './DocDashboardStyle.css';
import Navbar from './Navbar';

const Docdash = () => {
  const [patientsData, setPatientsData] = useState([]);

  useEffect(() => {
    const storedPatients = JSON.parse(localStorage.getItem('patientsData')) || [];
    setPatientsData(storedPatients);
  }, []);

  return (
    <div>
      <Navbar />
      <div className="doctor-dashboard">
        <h1>Doctor Dashboard</h1>
        <div className="patient-lists">
          <div className="waiting-patients">
            <h2>Waiting Patients</h2>
            <ul>
              {patientsData.map((patient) => (
                <li key={patient.id}>
                  <Link to={`/patient/${patient.id}`}>
                    <img src={patient.image} alt={patient.name} width="200" height="200" />
                    <span>{patient.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Docdash;
