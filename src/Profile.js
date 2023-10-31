import React, { useContext }  from 'react';
import { useNavigate } from 'react-router';
import { supabase } from "./auth"
import { AuthContext } from './AuthProvider';

function Profile() {
  const navigate = useNavigate()
const  {user} = useContext(AuthContext)

  const supabaseLogout = async (e) => {
    e.preventDefault()
    try {
      const { user, error } = await supabase.auth.signOut()
      if (error) {
        console.error('Error logging out:', error.message);
      } else {
        console.log('Logged out successful:');
        navigate("/")
    }
    } catch (error) {
      console.error('Error logging out', error.message);
    }
  };
  return (
    <>
    <div >
      Profile page
    </div>
    <button onClick={supabaseLogout}>Log out</button>
    <h1>Private Content</h1>
    <p>{JSON.stringify(user)}</p>
    </>
  );
}

export default Profile;
