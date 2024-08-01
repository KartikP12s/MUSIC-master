import React from 'react'
import '../projectCss/settings.css'
import PostLoginNavbar from '../components/PostLoginNavbar'
import AccountDetails from '../components/AccountDetails'
import {useState} from 'react'
import {Link, useNavigate} from "react-router-dom"
import axios from "axios";
import { buttonBaseClasses } from '@mui/material'


function SettingsPage() {
    const email = localStorage.getItem('email')
    const [isEmailRevealed, setIsEmailRevealed] = useState(false)
    const [isChangingPassword, setChangingPassword] = useState(false);
    const [currentPassword, setCurrentPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [newEmail, setNewEmail] = useState('')


  const navigate = useNavigate()

  const handleSubmit = (e) => {
      e.preventDefault()
      axios.post(`http://localhost:443/change-password`, {email,oldPassword: currentPassword,newPassword})
      .then(res => {
          if(res.data.Status === "Success") {
            console.log("password change succesful")             
          }
      }).catch(err => console.log(err))
  }

  const handleCurrentEmail = (e) => {
    e.preventDefault()
    axios.post(`http://localhost:443/change-email`, {oldEmail: email, newEmail})
    .then(res => {
        if(res.data.Status === "Success") {
          console.log("password change succesful")             
        }
    }).catch(err => console.log(err))
}
    const handleCurrentPasswordChange = (e) =>{
        setCurrentPassword(e.target.value)
    }
    const revealResetPassword = () =>{
        const button = document.querySelector('.reset-pass');
        button.style.display = 'block';
    }

    const handleCurrentPasswordSubmit = (e) => {
        e.preventDefault()
    
        axios.post('http://localhost:443/check-current-password', {
            email,
            password: currentPassword,
        })
        .then(response => {
            if (response.data.Status === 'Success') {
                setChangingPassword(true)
            } else {
                alert('Incorrect Password')
            }
        })
        .catch(err => {
            alert('Error checking password: ' + err.message)
        })
    }

    const handleRevealClick = () =>{
        setIsEmailRevealed(!isEmailRevealed)
    };
   
  return (
    <>
        <PostLoginNavbar/>
        <AccountDetails/>
        <div className='container1'>
                <div className='pfpContainer'>
                    <div className= 'blankspace'> </div>
                    <div className='picContainer'>
                        <img src="../src/icons/ProfilePicture.png" className='profilePicture' alt="" />
                        <p className='useremail'> {email}</p>
                        <button className='edit-button-1' onClick={handleCurrentEmail}>Edit User Profile</button>
                    </div>
                    <div className='userInfo-container'>
                    <div className='container3'>
                    <div className='userInfo'>
                        <p className = 'displayName1'>Email</p>
                        <div className='email-container'>
                            <p className = 'email'>{isEmailRevealed ? email: '******@gmail.com'}</p>
                            <button className='edit-button' onClick = {handleRevealClick}>Reveal</button>
                            <button className='edit-button'>Edit</button> 
                        </div>
                           
                        
                    </div>
                      <div className='changepassword'>
                      <p className = 'displayName1'> Configure Password</p>
                        <button className='edit-button-1' onClick={revealResetPassword}> Reset Password</button>

                        <form className='changepass-form' onSubmit = {handleCurrentPasswordSubmit}>
                        <div className='reset-pass'>
                        <p>Current Password</p>
                        
                        <input type="password" onChange={handleCurrentPasswordChange} />  
                        </div>
                        { isChangingPassword && (           
                            <>
                             <p>Change Password</p>
                            <input type="text" />

                            <p> Confirm Password</p>
                            <input  value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            type="text" 
                            />
                            <button className='edit-button-1' onClick={handleSubmit}>Sumbit</button>
                            </>
                        )}
                        

                                
                        </form>
                      </div>

                    <div className='edit-section'>
                    </div>
                    </div>
                </div>
                </div>
                
                
            
        </div>
        
    </>
  )
}

export default SettingsPage