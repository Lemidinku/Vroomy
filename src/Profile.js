import React, { useContext, useState,useEffect }  from 'react';
import { useNavigate } from 'react-router';
import { supabase } from "./auth"
import { AuthContext } from './AuthProvider';

function Profile() {
  const navigate = useNavigate()
  const  {user} = useContext(AuthContext)
  const [newAvatar, setNewAvatar] = useState() // file uploaded to input(type="file")
  const [avatarFilename,setAvatarFilename] = useState() // file name recieved from profiles.avatar_url
  const generalUrl = "https://wwoucxtafkpgzvjrwjye.supabase.co/storage/v1/object/public/avatars/"
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

  const getAvatarUrl = async () => {
    let { data: prof, error } = await supabase
    .from('profiles')
    .select('avatar_url')
    .eq("id", user.id)
    setAvatarFilename(prof[0].avatar_url)
  }
  useEffect(()=>{
    getAvatarUrl()
  },[])

  const UpdateAvatar = async (e)=> {
    if (!newAvatar) return 
    supabase.storage
    .from("avatars")
    .remove(avatarFilename)
    
    const { error: uploadError } = await supabase.storage
    .from("avatars")
    .upload(newAvatar.name, newAvatar);
    if (uploadError) console.log("Error Occured while uploading the file")

    getAvatarUrl()
  }

  const deleteAccount = async () => {
        const {data, error } = await supabase.auth.admin.deleteUser(user.id);
        if (error) {
          console.error('Error deleting user:', error);
          return;
        }
  
        console.log('User deleted:', data);
  }

  return (
    <>
    <div >
      Profile page
    </div>
    <button onClick={supabaseLogout}>Log out</button>
    <h1>Private Content</h1>
    <p>{JSON.stringify(user)}</p>
    {avatarFilename && <img src={generalUrl+ avatarFilename}></img>}
    <input type='file' accept=' *.png' onChange={e=>setNewAvatar(e.target.files[0])}/>
    <button onClick={UpdateAvatar}>Update Avatar</button>
    <div><button onClick={deleteAccount}>Delete Account</button></div>
    </>
  );
}

export default Profile;
