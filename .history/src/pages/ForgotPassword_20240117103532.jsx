import React from 'react'
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../projectCss/login.css'
import emailjs from "emailjs-com";




function ForgotPassword() {
  const [email, setEmail] = useState()
  const navigate = useNavigate()

  axios.defaults.withCredentials = true;
  const handleSubmit = (e) => {
      e.preventDefault()
      axios.post('http://localhost:3001/forgot-password', {email})
      .then(res => {
          if(res.data.Status === "Success") {
              navigate('/login')
             
          }
      }).catch(err => console.log(err))
  }  return (

    <>
        <div className="header-title">
          <img id="mainicon" src="src/icons/Airpfp.png" />
          <span className="header-text">Air Music</span>
      </div>
      <div className='form-box-holder'>
        <div className="form-box">
          <h1>Reset Password</h1>
          <div className="input-box">
            <ion-icon name="mail-outline"></ion-icon>
            <input
              type="email"
              placeholder="  Enter email to recieve reset link"
              style={{ fontFamily: 'Montserrat', fontSize: '1em'}}
              name="email"
             onChange={(e) => setEmail(e.target.value)}
              id="email"
            />
          </div>
        
          <button onClick={handleSubmit} className="btnlogin" style={{ fontFamily: 'Montserrat', fontSize:'1.5em'}}>Send Link</button>       
          <div className="login-register">
            
            <p className='dont-have-acc-text'>
              Remember your password?{" "}
              <Link to="/login" className="register-link">
                Log In Here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  )
}

export default ForgotPassword