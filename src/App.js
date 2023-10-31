import React, { useState } from 'react';
import './index.css';
import { useContext } from 'react';
import { AuthContext ,AuthProvider} from './AuthProvider';
import ContentWrapper from './ContentWrapper';

function App() {
//  const [isLoggedIn, setIsLoggedIn]= useState(true)
//  let value = {isLoggedIn,setIsLoggedIn}
  return (
    <AuthProvider>
      <ContentWrapper/>
    </AuthProvider>
  );
}

export default App;
