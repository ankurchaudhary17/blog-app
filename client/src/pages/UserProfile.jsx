import React, { useState,useContext, useEffect } from "react";

import { Link, useNavigate } from "react-router-dom";
import { FaEdit } from "react-icons/fa";
import { FaCheck } from "react-icons/fa";
import { UserContext } from '../context/userContext'

import axios from "axios";
const UserProfile = () => {
  const [avatar, setAvatar] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [error,setError]= useState('')
  
  
  const [isAvatarTouched,setIsAvatarTouched]=useState(false);
  const navigate=useNavigate();
  
  const {currentUser}=useContext(UserContext)
    const token = currentUser?.token;
    //redirect to login page for any user who is not loggeed in
    useEffect(()=>{
      if(!token){
        navigate('/login')
      }
    },[])

useEffect(()=>{
  const getUser=async()=>{
    const response =await axios.get(`${process.env.REACT_APP_BASE_URL}/users/${currentUser.id}`,
      {withCredentials:true , headers:{Authorization:`Bearer ${token}`}})
    const {name,email,avatar}=response.data;
    setName(name)
    setEmail(email)
    setAvatar(avatar)
  }
  getUser();
},[])

const changeAvatarHandler=async()=>{
  setIsAvatarTouched(false)
  try{
    const postData=new FormData();
    postData.set('avatar',avatar)
    //communicate with api
    const response =await axios.post(`${process.env.REACT_APP_BASE_URL}/users/change-avatar`,postData,{withCredentials:true , headers:{Authorization:`Bearer ${token}`}})
    setAvatar(response?.data.avatar)
  }catch(err){
    console.log(err)
  }
}


const updateUserDetails=async(event)=>{
event.preventDefault();

try{
  const userData= new FormData();
  userData.set('name',name)
  userData.set('email',email)
  userData.set('currentPassword',currentPassword)
  userData.set('newPassword',newPassword)
  userData.set('confirmNewPassword',confirmNewPassword)
  
  const response =await axios.patch(`${process.env.REACT_APP_BASE_URL}/users/edit-user`,
    userData,{withCredentials:true , headers:{Authorization:`Bearer ${token}`}})
  if(response.status===200){
    // log user out
    navigate('/logout')
  }
}catch(err){

setError(err.response.data.message)
}
}

  return (
    <section className="profile">
      <div className="container profile_container">
        <Link to={`/myposts/${currentUser.id}`} className="btn">
          My posts
        </Link>
        <div className="profile_details">
          <div className="avatar_wrapper">
            <div className="profile_avatar">
              <img src={`${process.env.REACT_APP_ASSETS_URL}/uploads/${avatar}`} alt="" />
            </div>
            {/* form to update avatar */}
            <form className="avatar_form" >
              <input
                type="file"
                name="avatar"
                id="avatar"
                onChange={(e) => setAvatar(e.target.files[0])}
                accept="png , jpg , jpeg"
              />
              <label htmlFor="avatar" onClick={()=>setIsAvatarTouched(true)}>
                <FaEdit />
              </label>
            </form>
           {isAvatarTouched && <button className="profile_avatar-btn" onClick={changeAvatarHandler}>
              <FaCheck />
            </button>}
          </div>
          <h1>{currentUser.name}</h1>
           {/* form to update user details  */}
           <form className="form profile_form" onSubmit={updateUserDetails}>
           {error &&<p className="form_error-message">{error}</p>}
            <input type="text" placeholder="Full Name" value={name} onChange={e=>setName(e.target.value)}/>
            <input type="email" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)}/>
            <input type="password" placeholder="Current Password" value={currentPassword} onChange={e=>setCurrentPassword(e.target.value)}/>
            <input type="password" placeholder="New Password" value={newPassword} onChange={e=>setNewPassword(e.target.value)}/>
            <input type="password" placeholder="confirm new password" value={confirmNewPassword} onChange={e=>setConfirmNewPassword(e.target.value)}/>
            <button type="submit" className="btn primary">Update my details</button>
           </form>
        </div>
      </div>
    </section>
  );
};

export default UserProfile;
