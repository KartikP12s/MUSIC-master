import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import '../projectCss/login.css';

const LOGIN_URL = '';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const [open, setOpen] = useState(location.state?.loggedOut || false);

  const onSubmit = async () => {
    setError('');

    try {
      const response = await axios.post('http://localhost:443/api/login', { email, password });
      console.log("Response: ", response.data);

      const userData = {
        email: response.data.email,
      };
      localStorage.setItem('email', userData.email);
      const accessToken = response.data.jwtToken;
      navigate('/home');
    } catch (err) {
      setError(err.response?.data.message);
      console.log('Error: ', err);
    }
  };

  const handleClose = (event, reason) => {
    // if (reason === 'clickaway') {
    //   return;
    // }
    setOpen(false);
  };

  return (
    <>
      <div className="header-title">
        <img id="mainicon" src="src/icons/Airpfp.png" />
        <span className="header-text">Air Music</span>
      </div>
      <div className='form-box-holder'>
        <div className="form-box">
          <h1>Login To Air Music</h1>
          <div className="input-box">
            <ion-icon name="mail-outline"></ion-icon>
            <input
              type="text"
              placeholder="Email"
              style={{ fontFamily: 'Montserrat', fontSize: '1em' }}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              id="email"
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
          <button onClick={onSubmit} className="btnlogin" style={{ fontFamily: 'Montserrat', fontSize: '1.5em' }}>
            Log In
          </button>
          <div className="login-register">
            <p className='forgot-pass-text'>
              <Link to="/forgotpassword" className="register-link">
                Forgot your password?
              </Link>
            </p>
            <p className='dont-have-acc-text'>
              Don't have an account?{" "}
              <Link to="/register" className="register-link">
                Sign Up Here
              </Link>
            </p>
          </div>
        </div>
      </div>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose} anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
        <MuiAlert color= 'inherit' onClose={handleClose} severity="success" sx={{ width: '100%' }}>
          Logged out successfully!
        </MuiAlert>
      </Snackbar>
    </>
  );
}

export default Login;
