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
const email = localStorage.getItem('email');
const [loggedIn, setLoggedIn] = useState(email ? true : false);

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route index element={loggedIn? <PostLoginHome/> : <Login/>}/>
      <Route path="/login" element={<Login />} />
      <Route path="/home" element={<PostLoginHome/>}/>
      <Route path="/register" element={<Register/>}/>
      <Route path="/playlist" element={<Playlist/>}/>
      <Route path="/forgotpassword" element={<ForgotPassword/>}/>
      <Route path= "/reset_password" element={<ResetPassword/>}/>
      <Route path="/reset_password/:id/:token" element={<ResetPassword />}></Route>
      <Route path="/search/:searchQuery" element={<Search/>}/>
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
    <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);