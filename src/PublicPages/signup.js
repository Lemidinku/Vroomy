import React  from 'react';
import { useNavigate } from 'react-router';
import { supabase } from '../auth';

function Signup() {

  const [userInfo, setUserInfo] = React.useState({email:"", password:"", role:"owner"})
  const navigate = useNavigate()


  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const { user, error } = await supabase.auth.signUp(
        {
        email: userInfo.email,
        password: userInfo.password,
        options: {
          data: {
            account_type: userInfo.role
            // add other meta datas like username, fullname...here
          }
        }
          }
        );
      if (error) {
        console.error('Error signing up 1:', error.message);
      } else {
        console.log('Signup successful:');
        navigate("/")
      }
    } catch (error) {
      console.error('Error signing up 2:', error.message);
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
  const changeRole = (newRole) => {
    setUserInfo(prev =>{
      return {
      ...prev,
      role: newRole
    }
    })
  }
  return (
    <div >
      <form onSubmit={handleSubmit}>
      <div>
        <span   onClick={()=>changeRole("renter")}>Renter</span>  <span  onClick={()=>changeRole("owner")}>Car Owner</span>
        </div>
      <h1>{userInfo.role}</h1>
      <input type='email' name="email" value={userInfo.email} onChange={handleChange}></input>
      <input type='password' name="password" value={userInfo.password} onChange={handleChange}></input>
      <button >Signup</button>
      </form>
    </div>
  );
}

export default Signup;
