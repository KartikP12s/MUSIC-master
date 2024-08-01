import React, { useState, useEffect, useRef } from 'react';
import '../projectCss/profileButton.css';
import { useNavigate } from 'react-router-dom';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';


function AccountDetails() {
  const [showModal, setShowModal] = useState(false);
  const [open, setOpen] = useState(false);
  const modalRef = useRef(null);

  const toggleModal = () => {
    setShowModal((prev) => !prev);
  };

  const handleClickOutside = (event) => {
    if (showModal && modalRef.current && !modalRef.current.contains(event.target)) {
      setShowModal(false);
    }
  };

  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem('email');
    setOpen(true);
    setTimeout(() => {
    navigate('/login', { replace: true });
    }, 2000);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  useEffect(() => {
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
        <img src='../src/icons/ProfilePicture.png' alt='ProfilePicture' className='defaultpfp' />
      </div>
      <div ref={modalRef} className={`on-click-modal-container ${showModal ? 'active' : ''}`}>
        <div className='account-settings'>
          <p className='account-setting-text'>Settings</p>
        </div>
        <div onClick={handleLogout} className='logout-button'>
          <p className='account-setting-text'>Log out</p>
        </div>
      </div>
      <Snackbar open={open} autoHideDuration={2000} onClose={handleClose}>
        <MuiAlert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
          Logged out successfully!
        </MuiAlert>
      </Snackbar>
    </div>
  );
}

export default AccountDetails;
