import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const userType = "admin";

  const handleRegister = () => {
    if (password.length < 8) {
      window.alert("Please enter a password of at least 8 characters");
      return;
    }
    if (username.length < 5) {
      window.alert("Please enter a username of at least 5 characters");
      return;
    }
    axios
      .post("http://localhost:443/api/register", { username, password, userType })
      .then((response) => {
        console.log(response.data);
        navigate("/registered"); // Redirect to "/registered" on successful registration
      })
      .catch((error) => {
        console.error(error.response.data.error);
        console.log(username + ": " + password);
      });
  };

  return (
    <div>
    <nav className="navbar">
      <ul className="navbar-nav">
        <li className="logo">
          <a href="#" className="nav-link">
            <img id="mainicon" src="icons/Airpfp.png" draggable="false" />
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
            <i id="navicons" className="fa-solid fa-plus fa-2x"></i>
            <button className="linktext">
              Create Playlist
            </button>
          </a>
        </li>
      </ul>
    </nav>
    <nav className="navigation">
      <a href="#">Home</a>
      <a href="#">About</a>
      <Link to="/login" className="regLogin">
        Login
      </Link>
    </nav>
    <div className="form-box">
      <h1> Register </h1>
      <div className="input-box">
        <ion-icon name="mail-outline"></ion-icon>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          id="email"
        />
      </div>
      <div className="input-box">
        <ion-icon name="key-outline"></ion-icon>
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          id="password"
        />
      </div>
      <button onClick={handleRegister} className="btnlogin" id="register" >
                              Register
      </button>
    </div>
  </div>
  );
}

export default Register;
