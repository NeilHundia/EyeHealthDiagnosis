import React from 'react';
import Navbar from './Navbar';
import './homepage.css'
function Homepage() {
    const navigateToDoclogin = () => {
        window.location.href = '/login';
      };
      const navigateToOplogin = () => {
        window.location.href = '/Oplogin';
      };
  return (
    <div>
        <Navbar/>
        <h2 className='welcome'>Welcome to Eye Health Diagnosis!</h2>
      <div className="maindiv">
        <p className='text'>In Asia, the prevalence of the disease is particularly high, with more than 30% of the population suffering from it.</p>
        <p className='text'>We have the solution to effectively combat and reduce the impact of this widespread issue!</p>
        <p className='text'>Get started as:</p>
        <button className="btn" onClick={navigateToDoclogin}>Doctor</button>
        <button className="btn" onClick={navigateToOplogin}>Operator</button>
    </div>
    </div>
  )
}

export default Homepage;