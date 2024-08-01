import {createBrowserRouter, createRoutesFromElements, Routes, Route, RouterProvider} from "react-router-dom";
import ReactDOM from 'react-dom/client'
import React from 'react'
import { store } from './musicFetchApis/store.js'
import { Provider } from 'react-redux'
import PreLoginHome from './pages/PreLoginHome.jsx'
import Login from '../src/pages/login'
import Register from './pages/Reg.jsx'
import PostLoginHome from "./pages/PostLoginHome.jsx";
import ForgotPassword from "./pages/ForgotPassword.jsx";
import ResetPassword from "./pages/ResetPassword.jsx";
import Search from "./pages/search.jsx";
import Playlist from "./pages/playlist.jsx";
import { useState } from "react";
import {createMemoryHistory} from 'history';
const email = localStorage.getItem('email');
let loggedIn = false;
if(email !== null){
  loggedIn = true;
}
const history = createMemoryHistory();

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route index element={loggedIn ? <PostLoginHome/> : <Login/>}/>
    <Route path="/login" element={loggedIn ? <Login /> : <Login/>} />
    <Route path="/home" element={loggedIn ? <PostLoginHome/> : <Login/>}/>
    <Route path="/register" element={loggedIn ? <Register/> : <Login/>}/>
    <Route path="/playlist" element={loggedIn ? <Playlist/> : <Login/>}/>
    <Route path="/forgotpassword" element={loggedIn ? <ForgotPassword/> : <Login/>}/>
    <Route path= "/reset_password" element={loggedIn ? <ResetPassword/> : <Login/>}/>
    <Route path="/reset_password/:id/:token" element={loggedIn ? <ResetPassword /> : <Login/>}></Route>
    <Route path="/search/:searchQuery" element={loggedIn ? <Search/> : <Login/>}/>
    </Route>
  ), {history}
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
    <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);