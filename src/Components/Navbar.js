import React from 'react'
import { Link } from 'react-router-dom'
import './Navbar.css'
export default function Navbar() {
  return (
    <div>
        <div className='navmain'>
            <Link to = "/homepage" className='head'>Autoyos</Link>
            <div className='navmain1'>
                <Link to = "/Oplogin">Operator's Dash</Link>
                <Link to = "/login">Doctor's Dash</Link>
                <Link to = "#">About</Link>
                <Link to = "#">Contact us</Link>
                <Link to = "#">Connect to your doctor</Link>
                
            </div>
        </div>
    </div>
  )
}
