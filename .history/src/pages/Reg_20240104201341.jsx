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
    <>
    <div className="header-title">
          <img id="mainicon" src="src/icons/Airpfp.png" />
          <span className="header-text">Air Music</span>
      </div>
      <div className='form-box-holder'>
        <div className="form-box">
          <h1>Create Account</h1>
          <div className="input-box">
            <ion-icon name="mail-outline"></ion-icon>
            <input
              type="text"
              placeholder="Username"
              style={{ fontFamily: 'Montserrat', fontSize: '1em'}}
              value={username}
              // onChange={(e) => setUsername(e.target.value)}
              id="email"
            />
          </div>
          <div className="input-box">
            <ion-icon name="key-outline"></ion-icon>
            <input
              type="password"
              style={{ fontFamily: 'Montserrat', fontSize: '1em'}}
              placeholder="Password"
              // value={password}
              // // onChange={(e) => setPassword(e.target.value)}
              // id="password"
            />
          </div>
          {/* <button onClick={onSubmit} className="btnlogin"> REUSE THIS FOR BUTTON*/}
          <button className="btnlogin" style={{ fontFamily: 'Montserrat', fontSize:'1.5em'}}>Register</button>
          <div className="login-register">
            <p className='dont-have-acc-text'>
              Already have an account?{" "}
              <Link to="/register" className="register-link">
                Sign In Here
              </Link>
            </p>
          </div>
        </div>
      </div>
  </>
  );
}

export default Register;
