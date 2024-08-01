import React from 'react'
import { useState } from 'react';
import { Link, useNavigate,useParams } from 'react-router-dom';
import axios from 'axios';
import '../projectCss/login.css'
import emailjs from "emailjs-com";




function ResetPassword() {
  const [password,setPassword] = useState();
  const navigate = useNavigate();
  const {id,token} = useParams();
  
  const handleSubmit = (e) => {
      e.preventDault();
      app.post(`http://localhost:443/reset-password/${id}/${token}`,{password}).then(res=>{
          console.log("forgot_pass" + res.data);
          if(res.data.Status == "Status"){
              //navigate('/login')
              console.log("HELLO")
          }
          else{
              console.log("fail")
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
          <h1>Enter Password</h1>
          <div className="input-box">
            <ion-icon name="mail-outline"></ion-icon>
            <input
              type="password"
              placeholder="  Enter email to recieve reset link"
              style={{ fontFamily: 'Montserrat', fontSize: '1em'}}
              name="password"
             onChange={(e) => setPassword(e.target.value)}
              id="email"
            />
          </div>
        
          
      <button type="submit" className="btnlogin" style={{ fontFamily: 'Montserrat', fontSize:'1.5em'}}>Reset Password</button>
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

export default ResetPassword