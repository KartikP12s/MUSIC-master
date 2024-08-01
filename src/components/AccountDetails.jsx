import React, { useState, useEffect, useRef } from 'react';
import '../projectCss/profileButton.css';
import { useNavigate } from 'react-router-dom';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import axios from 'axios';

function AccountDetails() {
  const [showModal, setShowModal] = useState(false);
  const modalRef = useRef(null);
  const navigate = useNavigate();
  const email = localStorage.getItem('email');
  const [img, setImg] = useState(null);

  const getProfilePic = async() => {
    try {
      const response = await axios.get(`http://localhost:5000/get-profile-pic?email=${email}`);
      setImg(response.data);
    } catch (error) {
      console.log(error);
    }
  }
  const handleClickSettings = () => {
    navigate('/settings')
    e.preventDefault();
  }

  const toggleModal = () => {
    setShowModal((prev) => !prev);
  };

  const handleClickOutside = (event) => {
    if (showModal && modalRef.current && !modalRef.current.contains(event.target)) {
      setShowModal(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('email');
    navigate('/login', { state: { loggedOut: true } });
  };

  useEffect(() => {
    getProfilePic();
    if (showModal) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showModal]);

  return (
    <div className='main-container'>
      <div className='profileContainer' onClick={toggleModal}>
        <img src={img ?`data:${img.contentType};base64,${imgBuffer.toString('base64')}` : '../src/icons/ProfilePicture.png'} 
             alt='ProfilePicture'
             className='defaultpfp'/>
      </div>
      <div ref={modalRef} className={`on-click-modal-container ${showModal ? 'active' : ''}`}>
        <div onClick={handleClickSettings} className='account-settings'>
          <p className='account-setting-text'>Settings</p>
        </div>
        <div onClick={handleLogout} className='logout-button'>
          <p className='account-setting-text'>Log out</p>
        </div>
      </div>
    </div>
  );
}

export default AccountDetails;
