import React from 'react'
import {useState} from "react"
import {Link, useNavigate} from "react-router-dom"
import axios from "axios";

function forgotPass() {
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
    <div>forgotPass</div>
  )
}

export default forgotPass