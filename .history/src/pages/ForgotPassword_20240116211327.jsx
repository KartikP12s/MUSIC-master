import React from 'react'
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../projectCss/login.css'
import emailjs from "emailjs-com";




function ForgotPassword() {
  const [email,setEmail] = useState();
  const navigate = useNavigate();
  
  const handleSubmit = (e) => {
      e.preventDault();
      app.post('http://localhost:443/api/forgot-password',{email}).then(res=>{
          console.log("forgot_pass" + res.data);
          if(res.data.Status == "Status"){
              navigate("/login")
          }
          else{
              navigate("/")
          }
      }).catch(err=>console.log(err))
  }
  return (

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
              type="text"
              placeholder="  Enter email to recieve reset link"
              style={{ fontFamily: 'Montserrat', fontSize: '1em'}}
              value={email}
             onChange={(e) => setEmail(e.target.value)}
              id="email"
            />
          </div>
        
          <form onSubmit={handleSubmit}>
      <button type="submit" className="btnlogin" style={{ fontFamily: 'Montserrat', fontSize:'1.5em'}}>Send Email</button>
         </form>
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