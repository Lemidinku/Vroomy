import React from 'react';
import { useNavigate } from 'react-router';
import { supabase } from '../auth';

function Login() {

const [userInfo, setUserInfo] = React.useState({email:"", password:""})
const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const { user, error } = await supabase.auth.signInWithPassword({email:userInfo.email, password: userInfo.password})
      if (error) {
        console.error('Error logging in:', error.message);
      } else {
        console.log('Logged in successful:');
        navigate("/")
    }
    } catch (error) {
      console.error('Error logging in', error.message);
    }
  };

  const handleChange = (e) => {
    setUserInfo(prev =>{
      return {
      ...prev,
      [e.target.name]: e.target.value
    }
    })
  }
 

  return (
    <div >
      <form onSubmit={handleSubmit}>
      <div>
      <input type='email' name="email" value={userInfo.email} onChange={handleChange}></input>
      </div>
      <div>
      <input type='password' name="password" value={userInfo.password} onChange={handleChange}></input>
      </div>
      <button >Login</button>

      </form>
    </div>
  );
}

export default Login;
