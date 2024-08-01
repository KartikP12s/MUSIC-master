\import React, { useState, useEffect, useRef } from 'react';
import '../projectCss/profileButton.css';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function AccountDetails() {
  const [showModal, setShowModal] = useState(false);
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
    toast.success('Logged out successfully!', {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 2000, // close after 2 seconds
    });
    setTimeout(() => {
      navigate('/login', { replace: true }); // use replace to avoid back button
    }, 2000); // navigate after 2 seconds to allow the toast to show
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
    </div>
  );
}

export default AccountDetails;
