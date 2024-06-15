// import React, { usestate,useEffect } from 'react'
// import {Link} from 'react-router-dom'
// import Avatar from '../images/avatar.png'
// import axios from 'axios'

// const PostAuthor = ({createdAt,authorID}) => {
//   const [author,setAuthor]=usestate({})
//   useEffect(()=>{
//     const getAuthor=async()=>{
//       try{
// const response=await axios.get(`${process.env.REACT_APP_BASE_URL}/users/${authorID}`)
//  setAuthor(response?.data)
//       }catch(err){
//         console.log(err)
//       }
//     }
//     getAuthor();
//   },[])
//   return (
//    <Link to = {`/posts/users/sdfsdf`} className='post_author'>
//     <div className='post_author-avatar'>
//         <img src={`${process.env.REACT_APP_ASSETS_URL}/uploads/${author?.avatar}`} alt=""/>
//     </div>
//     <div className='post_author-details'>
//         <h5>By: Ernest Achiver</h5>
//         <small>Just Now</small>
//     </div>
//    </Link>
//   )
// }

// export default PostAuthor

//by chat gpt
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Avatar from '../images/avatar.png';
import axios from 'axios';
import ReactTimeAgo from 'react-time-ago'
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en.json'
import ru from 'javascript-time-ago/locale/ru.json'

TimeAgo.addDefaultLocale(en)
TimeAgo.addLocale(ru)

const PostAuthor = ({ createdAt, authorID }) => {
  const [author, setAuthor] = useState({});

  useEffect(() => {
    const getAuthor = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/users/${authorID}`
        );
        setAuthor(response?.data || {});
      } catch (err) {
        console.log(err);
      }
    };
    getAuthor();
  }, [authorID]);

  return (
    <Link to={`/posts/users/${authorID}`} className='post_author'>
      <div className='post_author-avatar'>
        <img
          src={
            author?.avatar
              ? `${process.env.REACT_APP_ASSETS_URL}/uploads/${author.avatar}`
              : Avatar
          }
          alt={author?.name || 'Author avatar'}
        />
      </div>
      <div className='post_author-details'>
        <h5>By: {author?.name || 'Unknown Author'}</h5>
        <small><ReactTimeAgo date={new Date(createdAt)} locale='en-US'/></small>
      </div>
    </Link>
  );
};

export default PostAuthor;
