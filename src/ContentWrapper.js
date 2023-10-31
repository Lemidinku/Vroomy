import React, { createContext } from 'react';
import './index.css';
import Profile from './Profile';
import Public from './Public';
import Login from './login';
import Signup from './signup';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from './AuthProvider';

function ContentWrapper() {
const  {user} = useContext(AuthContext)
  return (
    <BrowserRouter>
        <Routes>
        <Route  index element={<Public/>}/>
        {!user ?
        <>
        <Route path='login' element={<Login/>}/>
        <Route path='Signup' element={<Signup/>}/>
        </>
        :<Route path='profile' element={<Profile/>}/>}
        </Routes>
  </BrowserRouter>
  );
}

export default ContentWrapper;
