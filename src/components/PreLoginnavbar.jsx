import React from 'react'
import '../projectCss/navbar.css'
import { Link, useNavigate } from "react-router-dom";
function PreLoginNavbar() {
  return (
    <>
    {/* top right nav bar */}
    <nav className="navigation">
    <a href="/register">Sign Up</a>
    <Link to="/login" className="loginbtn">
    <button className="loginbtn" style={{ fontFamily: 'Montserrat'}}>Login</button>
     </Link>
    </nav>
    
    {/* screen side nav bar */}
    <nav className="navbar">
            <ul className="navbar-nav">
                <li className="logo">
                    <a href="#" className="nav-link">
                        <img id="mainicon" src="../src/icons/Airpfp.png" draggable="false"/>
                        <span className="linktext">Air Music</span>
                    </a>
                </li>
               
                <li className="nav-item">
                    <a href="#" className="nav-link">
                        
                        <i id="navicons" className="fa-solid fa-house fa-2x"></i>
                        <span className="linktext">Home</span>
                    </a>
                </li>
             
                <li className="nav-item">
                    <a href="#" className="nav-link">
                        
                        <i id="navicons" className="fa-solid fa-magnifying-glass fa-2x"></i>
                        <span className="linktext">Search</span>
                    </a>
                </li>
                <li className="nav-item">
                    <a href="#" className="nav-link">
                        
                        <i id="navicons" className="fa-solid fa-music fa-2x"></i>
                        <span className="linktext">Playlists</span>
                    </a>
                </li>
                <li className="nav-item">
                    <a href="#" className="nav-link">
                        
                        <i id="navicons" className="fa-solid fa-heart fa-2x"></i>
                        <span className="linktext">Liked Songs</span>
                    </a>
                </li>
                <li className="nav-item">
                    <a href="#" className="nav-link">
                        <i  id="navicons" className="fa-solid fa-plus fa-2x"></i>
                        <span className="linktext">Create Playlist</span>
                    </a>
                </li>
            </ul>
        </nav>
    </>
  )
}

export default PreLoginNavbar