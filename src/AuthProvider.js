
import React, { createContext, useState, useEffect } from 'react';
import { supabase } from './auth';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState(null);
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setAuthState(session?.user)
    })
    const {data: { subscription },} = supabase.auth.onAuthStateChange((_event, session) => {
      setAuthState(session?.user)
    })

    return () => subscription.unsubscribe()
  }, [])

  return (
    <AuthContext.Provider value={{ user: authState }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };

