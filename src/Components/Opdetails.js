// import React from 'react'
// import './Opdetsstyle.css'
// import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// export default function Opdetails() {
//     const [patient, setPatient] = useState({
//         name: '',
//         email: '',
//         phone: '',
//         dob: '',
//         gender: '',
//       });
      
    
//       const handleChange = (e) => {
//         const { name, value } = e.target;
//         setPatient({ ...patient, [name]: value });
//       };
//       const navigate = useNavigate();
    
//       const handleSubmit = (e) => {
//         e.preventDefault();
//         console.log('Patient Data:', patient);
//         localStorage.setItem('patientData', JSON.stringify(patient));
//         navigate('/imgcapture');

//       };
//   return (
//     <div>
//     <div className="main">
//         <h2 id="title">Operator Details</h2>
//         <form id="registration">
//             <label htmlFor="name">Name : </label>
//             <input type="text" className="name" id="name" name='name' value={patient.name} onChange={handleChange}/><br/>

//             <label htmlFor="name">Email : </label>
//             <input type="email" className="email" id="email" name='email' value={patient.email} onChange={handleChange}/><br/>

//             <label htmlFor="name">Phone Number : </label>
//             <input type="number" className="phno" id="phno" name='phone' value={patient.phone} onChange={handleChange}/><br/>

//             <label htmlFor="dob">Date of birth :</label>
//             <input type="date" name="dob" id="dob"  value={patient.dob} onChange={handleChange}/><br/>   

//             <label htmlFor="name">Gender : </label><br/>
//             Male<input type="radio" className="gender" id="gender" name="gender" value='male' checked={patient.gender === 'male'} onChange={handleChange}/> <br/>
//             Female<input type="radio" className="gender" id="gender" name="gender"value='female' checked={patient.gender === 'female'} onChange={handleChange}/><br/>

//             I agree to all terms and conditions.
//             <input type="checkbox" name="tandc" id="tandc" required/><br/>          
               
//             <button type="submit" className='button' onClick={handleSubmit}>Submit</button>
//             <button type="reset" className='button'>Reset</button>
//         </form>
//     </div>
//     </div>
//   )
// }

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Opdetsstyle.css';
import Navbar from './Navbar';

const Opdetails = () => {
  const [patient, setPatient] = useState({
    id: Date.now(),
    name: '',
    email: '',
    phone: '',
    dob: '',
    gender: '',
    image: ''
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPatient({ ...patient, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const existingPatients = JSON.parse(localStorage.getItem('patientsData')) || [];
    existingPatients.push(patient);
    localStorage.setItem('patientsData', JSON.stringify(existingPatients));
    navigate('/imgcapture');
  };

  return (
    <div>
      <div className="main">
        <h2 id="title">Patient Details</h2>
        <form id="registration" onSubmit={handleSubmit}>
          <label htmlFor="name">Name: </label>
          <input type="text" name="name" value={patient.name} onChange={handleChange} /><br />
          
          <label htmlFor="email">Email: </label>
          <input type="email" name="email" value={patient.email} onChange={handleChange} /><br />
          
          <label htmlFor="phone">Phone Number: </label>
          <input type="number" name="phone" value={patient.phone} onChange={handleChange} /><br />
          
          <label htmlFor="dob">Date of Birth: </label>
          <input type="date" name="dob" value={patient.dob} onChange={handleChange} /><br />
          
          <label htmlFor="gender">Gender: </label><br />
          <label>
            <input type="radio" name="gender" value="male" checked={patient.gender === 'male'} onChange={handleChange} /> Male
          </label>
          <label>
            <input type="radio" name="gender" value="female" checked={patient.gender === 'female'} onChange={handleChange} /> Female
          </label><br />
          
          <label>
            I agree to all terms and conditions.
            <input type="checkbox" name="tandc" required />
          </label><br />
          
          <button type="submit" className="button">Submit</button>
          <button type="reset" className="button">Reset</button>
        </form>
      </div>
    </div>
  );
};

export default Opdetails;
