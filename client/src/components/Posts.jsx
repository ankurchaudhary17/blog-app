import React from "react";
import { useState, useEffect } from "react";
import PostItem from "./PostItem";
import Loader from "../components/Loader";
import axios from "axios";

// import { DUMMY_POSTS } from "../data";

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    const fetchPosts = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/posts`
        );
        setPosts(response?.data );
      } catch (err) {
        console.log(err);
      }
      setIsLoading(false);
    };
    fetchPosts();
  }, []);
  if (isLoading) {
    return <Loader />;
  }
  return (
    <section className="posts">
      {posts.length > 0 ? (
        <div className="container posts_container">
          {
            //destructure all the property we need like thumbnail ,id,category,titel,desc
               posts.map(({ _id:id, thumbnail, category, title, description, creator,createdAt }) => (
              <PostItem
                 key={id}
                postID={id}
                thumbnail={thumbnail}
                category={category}
                 title={title}
                 description={description}
                 authorID={creator}
                createdAt={createdAt}
             /> 
            )) //passing all props
          }
        </div>
      ) : (
        <h2 className="center">No posts found</h2>
      )}
    </section>
  );
};

export default Posts;


// from chatgpt
// import React, { useState, useEffect } from "react";
// import PostItem from "./PostItem";
// import Loader from "../components/Loader";
// import axios from "axios";

// const Posts = () => {
//   const [posts, setPosts] = useState([]);
//   const [isLoading, setIsLoading] = useState(false);

//   useEffect(() => {
//     const fetchPosts = async () => {
//       setIsLoading(true);
//       try {
//         const response = await axios.get(
//           `${process.env.REACT_APP_BASE_URL}/posts`
//         );
//         setPosts(response?.data || []); // Ensure posts is an array
//       } catch (err) {
//         console.log(err);
//       }
//       setIsLoading(false);
//     };
//     fetchPosts();
//   }, []);

//   if (isLoading) {
//     return <Loader />;
//   }

//   return (
//     <section className="posts">
//       {posts.length > 0 ? (
//         <div className="container posts_container">
//           {
//             // Destructure all the properties we need like thumbnail, id, category, title, desc
            // posts.map(({ _id:id, thumbnail, category, title, description, creator,createdAt }) => (
            //   <PostItem
            //     key={id}
            //     postID={id}
            //     thumbnail={thumbnail}
            //     category={category}
            //     title={title}
            //     description={description}
            //     authorID={creator}
            //     createdAt={createdAt}
            //   />
//             )) // Passing all props
//           }
//         </div>
//       ) : (
//         <h2 className="center">No posts found</h2>
//       )}
//     </section>
//   );
// };

// export default Posts;
