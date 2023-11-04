import React  from 'react';
import { useNavigate } from 'react-router';
function Public() {
  const navigate = useNavigate()
  const goToLogIn = async (e) => {navigate("./login")};
  return (
    <>
    <div >
      HOME
    </div>
    <p>
    To determine whether a user is logged in or logged out when using Supabase with React, you can keep track of the authentication state using the onAuthStateChange event provided by Supabase. Here's an example of how you can achieve this:

Set up the authentication state management:
In a file such as AuthContext.js, create a new context and state management for the authentication status.
Import the necessary dependencies: React, useState, useEffect, and your Supabase client instance.
Create a new context using the createContext function.
Define a custom AuthProvider component that wraps your application and manages the authentication state:
    </p>
    </>
  );
}

export default Public;
