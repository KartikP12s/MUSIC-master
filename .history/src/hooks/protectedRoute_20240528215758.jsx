import {useEffect} from 'react';
import { Route,Redirect, Navigate, Outlet, useNavigate, useLocation} from "react-router-dom";
import jwtDecode from "jwt-decode";
import axios from "axios";

const ProtectedRoute = (props) => {
    const email = localStorage.getItem("email");
    const navigate = useNavigate();
    if(email === null || !){
        navigate('/login')
    }
}