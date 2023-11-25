import React  from 'react';
import { useNavigate } from 'react-router';
import { supabase } from '../auth';

function Signup() {
  const navigate = useNavigate()
  
  const [userInfo, setUserInfo] = React.useState({
            email:"", 
            password:"", 
            repeatedPassword:"" , 
            role:"owner", 
            fullname:"", 
            username:"", 
            phone_number:""
          })
  const handleSubmit = async (e) => {
    e.preventDefault()
    if (! await validInputs()) return
    try {
      const {error } = await supabase.auth.signUp(
        {
        email: userInfo.email,
        password: userInfo.password,
        options: {
          data: {
            account_type: userInfo.role,
            full_name : userInfo.fullname,
            username : userInfo.username,
            phone_number: userInfo.phone_number
          }
        }
          }
        );
      if (error) {
        console.error('Error signing up:', error.message);
      } else {
        console.log('Signup successful:');
        navigate("/")
      }
    } catch (error) {
      console.error('Error signing up:', error.message);
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
  const changeRole = (e) => {
    setUserInfo(prev =>{
      return {
      ...prev,
      role: e.target.value
    }
    })
  }

  const validInputs = async () => {
    let { data, error } = await supabase
    .from('profiles')
    .select('id')
    .eq("username", userInfo.username)
    if (data[0]) { 
      console.log("Username already exist")
      return false
      }
    if (error) 
    {console.log(error.message)
      return false
    }

    if (userInfo.password !== userInfo.repeatedPassword) {
      console.log("Passwords does not match")
      return false
    }

    const validatePhoneNumber = (phoneNum) => {
      
      if (phoneNum.startsWith("09") && phoneNum.startsWith("07")) return false
      if (isNaN(parseInt(phoneNum))) return false
      if (phoneNum.length!== 10) return false

      return true
    }
    
    if (!validatePhoneNumber(userInfo.phone_number)) {
      console.log("Invalid Phone Number")
      return false
    }








    return true

    
  }
  return (
    <div>
    <form onSubmit={handleSubmit}>
      <h1>{userInfo.role}</h1>
      <div>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            value={userInfo.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="fullname">Fullname</label>
          <input
            type="text"
            name="fullname"
            id="fullname"
            value={userInfo.fullname}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            name="username"
            id="username"
            value={userInfo.username}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="phone_number">Phone Number</label>
          <input
            type="tel"
            name="phone_number"
            id="phone_number"
            value={userInfo.phone_number}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            minLength="6"
            name="password"
            id="password"
            value={userInfo.password}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="repeatedPassword">Repeat Password</label>
          <input
            type="password"
            minLength="6"
            name="repeatedPassword"
            id="repeatedPassword"
            value={userInfo.repeatedPassword}
            onChange={handleChange}
            required
          />
        </div>
      </div>
      <label htmlFor="owner">Owner</label>
      <input type='radio' name="role"  id="owner" value="owner" checked={userInfo.role == "owner"} onChange={changeRole} required></input>
      <input type='radio' name="role"  id="renter" value="renter" checked={userInfo.role == "renter"} onChange={changeRole} required></input>
      <label htmlFor="renter">Renter</label>
      <button >Signup</button>
      </form>
    </div>
  );
}

export default Signup;
