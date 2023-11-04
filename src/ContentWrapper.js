import React, { createContext } from 'react';
import './index.css';
import Profile from './Profile';
import Public from './Public';
import Login from './login';
import Signup from './signup';
import Layout from './Components/Layout';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from './AuthProvider';

function ContentWrapper() {
const  {user} = useContext(AuthContext)
  return (
    <BrowserRouter>
        <Routes>
          <Route element={<Layout/>}>
              <Route  index element={<Public/>}/>
              <Route path='login' element={<Login/>}/>
              {!user ?
              <>
              <Route path='Signup' element={<Signup/>}/>
              </>
              :<Route path='profile' element={<Profile/>}/>}
          </Route>
        </Routes>
  </BrowserRouter>
  );
}

export default ContentWrapper;
