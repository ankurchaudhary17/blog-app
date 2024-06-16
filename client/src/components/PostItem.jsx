import React from "react";
import { Link } from "react-router-dom";
import PostAuthor from "./PostAuthor";

function stripHtmlTags(html) {
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = html;
    return tempDiv.textContent || tempDiv.innerText || "";
  }

const PostItem = ({
  postID,
  title,
  thumbnail,
  authorID,
  category,
  description,
  createdAt,
}) => {

  // Strip HTML tags from the description
  const cleanedDescription = stripHtmlTags(description);

  const shortDescription =
  cleanedDescription.length > 145 ? cleanedDescription.substring(0, 145) + "..." : cleanedDescription;
  const postTitle = title.length > 30 ? title.substr(0, 30) + "..." : title;
  return (
    //each post should be an article
    <article className="post">
      <div className="post_thumbnail">
        <img src={`${thumbnail}`} alt={title} />
      </div>
      <div className="post_content">
        <Link to={`/posts/${postID}`}>
          <h3>{postTitle}</h3>
        </Link>

        {/* Need to ahndle */}
        <p>{shortDescription}</p>
        <div className="post_footer">
          <PostAuthor authorID={authorID} createdAt={createdAt} />
          <Link to={`/posts/categories/${category}`} className="btn category">
            {category}
          </Link>
        </div>
      </div>
    </article>
  );
};

export default PostItem;


// import React from "react";
// import { Link } from "react-router-dom";
// import PostAuthor from "./PostAuthor";

// function stripHtmlTags(html) {
//   const tempDiv = document.createElement("div");
//   tempDiv.innerHTML = html;
//   return tempDiv.textContent || tempDiv.innerText || "";
// }

// const PostItem = ({
//   postID,
//   title,
//   thumbnail,
//   authorID,
//   category,
//   description,
//   createdAt,
// }) => {
//   // Strip HTML tags from the description
//   const cleanedDescription = stripHtmlTags(description);

//   // Create a short description from the cleaned text
//   const shortDescription =
//     cleanedDescription.length > 145 ? cleanedDescription.substr(0, 145) + "..." : cleanedDescription;

//   const postTitle = title.length > 30 ? title.substr(0, 30) + "..." : title;

//   return (
//     // Each post should be an article
//     <article className="post">
//       <div className="post_thumbnail">
//         <img src={`${process.env.REACT_APP_ASSETS_URL}/uploads/${thumbnail}`} alt={title} />
//       </div>
//       <div className="post_content">
//         <Link to={`/posts/${postID}`}>
//           <h3>{postTitle}</h3>
//         </Link>

//         {/* Display the cleaned and shortened description */}
//         <p>{shortDescription}</p>
//         <div className="post_footer">
//           <PostAuthor authorID={authorID} createdAt={createdAt} />
//           <Link to={`/posts/categories/${category}`} className="btn category">
//             {category}
//           </Link>
//         </div>
//       </div>
//     </article>
//   );
// };

// export default PostItem;

