import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Stack from '@mui/material/Stack';

function Register() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showAlert, setShowAlert] = useState(false); // New state to control alert visibility
  const [confirmPassword, setConfirmPassword] = useState("");
  const userType = "admin";

  const handleRegister = () => {
    if (password.length < 8) {
      window.alert("Please enter a password of at least 8 characters");
      return;
    }
    if (!(password === confirmPassword)) {
      console.log("NOtMATCH");
      setShowAlert(true);
      return;
    }
    axios
      .post("http://localhost:443/api/register", { username, password, userType })
      .then((response) => {
        console.log(response.data);
        const userData = {
          // Extract and set user information from the server response
          // Assuming the role is available in response.data.role
          username: username,
          userType: userType
          // Include any other relevant user data
        };
        localStorage.setItem('userData', JSON.stringify(userData));
        console.log("DATA")
        console.log(JSON.stringify(userData));
        navigate("/login"); // Redirect to "/login" on successful registration and
      })
      .catch((error) => {
        console.error(response.data.error);
        console.log(response);
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
              style={{ fontFamily: 'Montserrat', fontSize: '1em' }}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="input-box">
            <ion-icon name="key-outline"></ion-icon>
            <input
              type="password"
              style={{ fontFamily: 'Montserrat', fontSize: '1em' }}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              id="password"
            />
          </div>
          <div className="input-box">
            <ion-icon name="key-outline"></ion-icon>
            <input
              type="password"
              style={{ fontFamily: 'Montserrat', fontSize: '1em' }}
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              id="password"
            />
          </div>
          {/* <button onClick={onSubmit} className="btnlogin"> REUSE THIS FOR BUTTON*/}
          <button onClick={handleRegister} style={{ fontFamily: 'Montserrat', fontSize: '1.5em' }} className="btnlogin" id="register" >
            Register
          </button>
          <div className="login-register">
            <p className='dont-have-acc-text'>
              Already have an account?{" "}
              <Link to="/login" className="register-link">
                Sign In Here
              </Link>
            </p>
            {showAlert && (
        <Stack sx={{ width: '100%' }} spacing={2}>
          <Alert severity="error">Password do not match!</Alert>
        </Stack>
      )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Register;
