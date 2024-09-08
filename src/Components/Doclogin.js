import React from 'react';
import './Doclogin.css';
import Navbar from './Navbar';

export default function Doclogin() {
  const navigateToDashboard = () => {
    window.location.href = '/docdash';
  };

  return (
    <div className="container">
       <Navbar/>
      <div className="form">
        <h2 className="title">Login</h2>
        <form>
          <label htmlFor="username">Username: </label>
          <input type="text" name="username" id="username" placeholder="Enter your username" required />

          <label htmlFor="password">Password: </label>
          <input type="password" name="password" id="password" placeholder="Enter your password" required />

          <button type="button" className='button' onClick={navigateToDashboard}>Login</button>
          <button type="reset" className='button'>Reset</button>

          <a href="/">Forgot your password?</a>
        </form>
      </div>
    </div>
  );
}
