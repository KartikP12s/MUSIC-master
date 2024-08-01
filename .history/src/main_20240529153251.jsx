import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { RouterProvider, createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { store } from './musicFetchApis/store';
import PreLoginHome from './pages/PreLoginHome';
import Login from './pages/Login';
import Register from './pages/Reg';
import PostLoginHome from './pages/PostLoginHome';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import Search from './pages/Search';
import Playlist from './pages/Playlist';
import ProtectedRoute from './hooks/ProtectedRoute';
import { createMemoryHistory } from 'history';

const history = createMemoryHistory();

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route index element={<ProtectedRoute element={PostLoginHome} />} />
      <Route path="/login" element={<Login />} />
      <Route path="/home" element={<ProtectedRoute element={PostLoginHome} />} />
      <Route path="/register" element={<Register />} />
      <Route path="/playlist" element={<ProtectedRoute element={Playlist} />} />
      <Route path="/forgotpassword" element={<ForgotPassword />} />
      <Route path="/reset_password" element={<ResetPassword />} />
      <Route path="/reset_password/:id/:token" element={<ResetPassword />} />
      <Route path="/search/:searchQuery" element={<ProtectedRoute element={Search} />} />
    </Route>
  ),
  { history }
);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
