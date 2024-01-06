import React from 'react';
import { useNavigate } from 'react-router';
import { supabase } from '../auth';
import "../styles/login.css"
import keyImage from '../images/key.png'; 

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
      <div className='login__component'>
        <div className='block-1'>
        <div className="block-1__greeting">
            <h1 className="block-1__head">Welcome!</h1>
            <p className="block-1__desc">Roam with <span className="block-1__desc--span">Vroomy</span>, Your Reliable car rental companion</p>
        </div>
        <div className="block-1__block">
            <form className="block-1__form" onSubmit={handleSubmit}>
                <div className="block-1__icons">
                    <span className="block-1__icon"><i className="fa-solid fa-user"></i></span>
                    <input className="block-1__input" placeholder="Email" type='email' name="email" value={userInfo.email} onChange={handleChange} required/>                
                </div>
                <div className="block-1__icons">
                    <span className="block-1__icon"><i className="fa-solid fa-lock"></i></span>
                    <input className="block-1__input" type='password' name="password" value={userInfo.password} onChange={handleChange} placeholder="Password" required/>
                </div>
                
                
                <a className="block-1__link block-1__link--modify" href="#">forgot password?</a>
                <button className="block-1__button block-1__input--button ">Login</button>
            </form>
        </div>
        
        <div className="block-1__signup">
            <p className="block-1__desc">New to Vroomy?
                <a className="block-1__link" href="#"> Sign up</a>
            </p>
        </div>
        </div>
        <div className='block-2'>
          <img className='block-2__img' src={keyImage}/>
        </div>
      </div>
  );
}

export default Login;
