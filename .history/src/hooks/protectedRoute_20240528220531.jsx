import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useAuth } from './AuthContext';

const ProtectedRoute = () => {
    const email = localStorage.getItem('email');
    if(email === null){
        return <Redirect to='/login' />
    }

};