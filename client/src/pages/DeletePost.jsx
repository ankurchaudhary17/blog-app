// import React from 'react'
// import { UserContext } from '../context/userContext'
// import { useContext, useEffect } from 'react'
// import { useNavigate } from 'react-router-dom'
// import { Link ,useLocation} from 'react-router-dom'
// import axios from 'axios'


  

// const DeletePost = ({postId:id}) => {
//   const navigate=useNavigate();
//   const location=useLocation();
  

//   const {currentUser}=useContext(UserContext)
//     const token=currentUser?.token;

//      //redirect to login page for any user who is not logged in
//      useEffect(()=>{
//       if(!token){
//         navigate('/login')
//       }
//     },[])

//     const removePost=async()=>{
//      try{
//       const response = await axios.delete(`${process.env.REACT_APP_BASE_URL}/posts/${id}`,{withCredentials:true,headers:{Authorization:`Bearer ${token}`}})
//       if(response.status == 200){
//         if(location.pathname == `/myposts/${currentUser.id}`){
//           navigate(0)
//         }else{
//           navigate('/')
//         }
//       }
//      }catch(error){
//       console.log(error);
//      }
//     }
//   return (
//   <Link className='btn sm danger' onClick={()=>removePost(id)}>Delete</Link>
//   )
// }

// export default DeletePost


import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { UserContext } from '../context/userContext';
import Loader from '../components/Loader';

const DeletePost = ({ postId }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoading,setIsLoading]=useState(false)
  const { currentUser } = useContext(UserContext);
  const token = currentUser?.token;

  // Redirect to login page for any user who is not logged in
  useEffect(() => {
    if (!token) {
      navigate('/login');
    }
  }, [token, navigate]);

  const removePost = async () => {
    setIsLoading(true)
    try {
      const response = await axios.delete(`${process.env.REACT_APP_BASE_URL}/posts/${postId}`, {
        withCredentials: true,
        headers: { Authorization: `Bearer ${token}` }
      });
      if (response.status === 200) {
        if (location.pathname === `/myposts/${currentUser.id}`) {
          navigate(0); // Refresh the page
        } else {
          navigate('/');
        }
      }
      setIsLoading(false)
    } catch (error) {
      console.error('Failed to delete the post:', error);
    }
  };
if(isLoading){
  return <Loader/>
}
  return (
    <button className="btn sm danger" onClick={removePost}>Delete</button>
  );
};

export default DeletePost;
