import React  from 'react'
import { useState ,useEffect} from 'react'
import Loader from '../components/Loader'
import PostItem from '../components/PostItem'
import { useParams } from 'react-router-dom'
import axios from 'axios'
const AuthorPosts = () => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const {id}=useParams();

  useEffect(() => {
    const fetchPosts = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/posts/users/${id}`
        );
        setPosts(response?.data || []); // Ensure posts is an array
      } catch (err) {
        console.log(err);
      }
      setIsLoading(false);
    };
    fetchPosts();
  }, [id]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <section className="posts">
      {posts.length > 0 ? (
        <div className="container posts_container">
          {
            // Destructure all the properties we need like thumbnail, id, category, title, desc
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
            )) // Passing all props
          }
        </div>
      ) : (
        <h2 className="center">No posts found</h2>
      )}
    </section>
  );
};




export default AuthorPosts
