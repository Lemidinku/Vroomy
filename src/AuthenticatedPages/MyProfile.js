import React, { useContext, useState,useEffect }  from 'react';
import { useNavigate } from 'react-router';
import { supabase } from "../auth"
import { AuthContext } from '../AuthProvider';
import { v4 as urlGenerator } from 'uuid';
import "../styles/profile.css"

// temporary imports
import carImage from "../images/car.png"
import userPhoto from "../images/userPhoto.png"
import starImage from "../images/star.png"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-regular-svg-icons'
import { faStar } from '@fortawesome/free-solid-svg-icons';

function MyProfile() {
  const navigate = useNavigate()
  const  {user} = useContext(AuthContext)

  const [editing, setEditing] = useState(false)
  const [newUserInfo, setNewUserInfo] = useState({
            full_name:"", 
            username:"", 
            phone_number:""
  }) // {username,fullname, phone_number, avatar_url}
  const [newAvatar, setNewAvatar] = useState() // file uploaded to input(type="file")
  const [userInfo, setUserInfo] = useState({
    full_name:"", 
    username:"", 
    phone_number:"",
    avatar_url:""
}) // [username,fullname, phone_number, avatar_url
  const generalUrl = "https://wwoucxtafkpgzvjrwjye.supabase.co/storage/v1/object/public/avatars/"
  const supabaseLogout = async (e) => {
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

  const getProfileInfo = async () => {
    let { data: prof, error } = await supabase
    .from('profiles')
    .select('username,full_name, phone_number, avatar_url')
    .eq("id", user.id)
    setUserInfo(prof[0])
  }

  useEffect(()=>{
    getProfileInfo()
  },[])





  const UpdateAvatar = async (e)=> {
    if (!newAvatar) return 
    supabase.storage
    .from("avatars")
    .remove(userInfo.avatar_url)
    
    const { error: uploadError } = await supabase.storage
    .from("avatars")
    .upload(urlGenerator(), newAvatar);
    if (uploadError) console.log("Error Occured while uploading the file")

    getProfileInfo()
  }

const deleteAccount = async () => {
        let temp_id = user.id
        await supabaseLogout()
        const {data, error } = await supabase.auth.admin.deleteUser(temp_id);
        if (error) {
          console.error('Error deleting user:', error);
          return;
        }
        navigate("/")
        console.log('User deleted:', data);
  }

const submitChanges = async (e) => {
    
    // validate inputs before submitting
    if (! await validInputs()) return
    try {
          const {data, error} = await supabase
            .from('profiles')
            .update([
              {
                full_name: newUserInfo.full_name,
                username:newUserInfo.username, 
                phone_number: newUserInfo.phone_number
              },
            ]).eq("id", user.id)


            if (error) {
              console.error('Error updating user info:', error);
              return;
            }
            setEditing(false) 
            UpdateAvatar(e)
        }
    
    catch (error) {
      console.error('Error updating user info:', error.message);

     
    }
  };

  const handleChange = (e) => {
    setNewUserInfo(prev =>{
      return {
      ...prev,
      [e.target.name]: e.target.value
    }
    })
  }

const validInputs = async () => {
    let { data, error } = await supabase
    .from('profiles')
    .select('id')
    .eq("username", newUserInfo.username)
    if (data[0]) { 
      console.log("Username already exist")
      return false
      }
    if (error) 
    {console.log(error.message)
      return false
    }

    const validatePhoneNumber = (phoneNum) => {
      
      if (phoneNum.startsWith("09") && phoneNum.startsWith("07")) return false
      if (isNaN(parseInt(phoneNum))) return false
      if (phoneNum.length!== 10) return false

      return true
    }
    
    if (!validatePhoneNumber(newUserInfo.phone_number)) {
      console.log("Invalid Phone Number")
      return false
    }
    return true

    
  }
  return (
    <>

    <button onClick={supabaseLogout}>Log out</button>
    <div><button onClick={deleteAccount}>Delete Account</button></div>

    <div className='profile'>
        <div className="firstColumn">
            <div className="user">
                <div className="user__photoAndRating">
                    <div className="user__photoAndRating__photo"><img className="user__photo__image" src={ userInfo?.avatar_url? generalUrl+ userInfo.avatar_url : userPhoto}
                            alt=""/></div>
                    <div className="user__photoAndRating__rating">
                        <div className="user__photoAndRating__rating__stars">
                            <FontAwesomeIcon className={'rating__star--colored'} icon={faStar}/>
                            <FontAwesomeIcon className={'rating__star'} icon={faStar}/>
                            <FontAwesomeIcon className={'rating__star'} icon={faStar}/>
                            <FontAwesomeIcon className={'rating__star'} icon={faStar}/>
                            <FontAwesomeIcon className={'rating__star'} icon={faStar}/>


                        </div>
                        <div className="user__photoAndRating__rating__numberOfStars">
                            <h2>5 Stars</h2>
                        </div>
                        { editing && <div>
                        <input type='file' accept=' *.png' onChange={e=>setNewAvatar(e.target.files[0])}/>
                        
                        </div>}
                    </div>
                </div>

                <div className="user__name">
                    <input className='info__list__li__input'              
                            type="text"
                            name="full_name"
                            id="full_name"
                            value={newUserInfo.full_name} 
                            onChange={handleChange} 
                            placeholder= {userInfo.full_name}
                            readOnly = {editing?false :true }
                            required
                            />
                    
                </div>
                
                <div className="user__joiningDate">
                    <h3>Joined on <span>{new Date(user.created_at).toLocaleDateString(undefined,{ year: 'numeric', month: 'long', day: 'numeric' })}</span> - 132 Trips</h3>
                </div>
            </div>
            <div className="info">
                <div className="info__heading">
                    <h2>Personal Info</h2>
                </div>
                <div className="info__list">
                    <ul className="info__list__ul">
                        <li className="info__list__li">
                            <h2>Email Address</h2>
                        </li>
                        <li className="info__list__li">
                            <h2>Username</h2>
                        </li>
                        <li className="info__list__li">
                            <h2>Phone Number</h2>
                        </li>
                    </ul>
                    <ul className="info__list__ul">
                        <li className="info__list__li">
                            <input className='info__list__li__input'  type="email" name="email" placeholder={user.email} readOnly/>
                        </li>
                        <li className="info__list__li">
                            <input className='info__list__li__input' 
                            type="text"
                            name="username"
                            id="username"
                            placeholder={userInfo.username}
                            value={newUserInfo.username}
                            onChange={handleChange}
                            readOnly = {editing?false :true }
                            required
                            />
                        </li>
                        <li className="info__list__li">
                            <input className='info__list__li__input' 
                            type="tel"
                            name="phone_number"
                            id="phone_number"
                            value={newUserInfo.phone_number}
                            onChange={handleChange}
                             placeholder={userInfo.phone_number}
                             readOnly = {editing?false :true }
                             required
                             />

                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <div className="secondColumn">
            {editing && <div className="saveCofirmation">
                  <button type="submit" className="saveConfirmation__saveButton " onClick={submitChanges}>
                    <h3>Save Changes</h3>
                </button>
                <button type="reset" className="saveConfirmation__cancelButton" onClick={()=>setEditing(false)}>
                    <h3>Cancel</h3>
                </button>
            </div>}
            {!editing && <div className="editProfile">
                <button type="button" className="editProfile__button" onClick={()=>setEditing(true)}>
                    <h3>Edit Profile</h3>
                </button>
                
            </div>}
            <div className="carHeading">
                <h3>Darrow's Vehicles</h3>
            </div>
            <div className="car">
                <div><img className="car__image" src={carImage} alt=""/></div>
                <div className="car__name">
                    <h2>G wagon Brabus 2023</h2>
                </div>
                <div className="car__line">
                    <hr/>
                </div>
                <div className="car__price">
                    <h2>$250/day</h2>
                </div>
            </div>
        </div>
    </div>

    </>

    
  );
}

export default MyProfile;
