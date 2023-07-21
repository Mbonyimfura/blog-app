import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Home = () => {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:3000/post/getPosts")
      .then((response) => setPosts(response.data))
      .catch((err) => console.log(err));
  }, []);
  return (
    <div className="posts_container">
      {posts.map((post) => (
        <Link to={`/post/${post._id}`} className="post" key={post._id}>
          <img src={`http://localhost:3000/Public/Images/${post.file}`} alt="Blog Post Image" />

          <div className="post_text">
            <h2>{post.title}</h2>
            <p>{post.description}</p>
          </div>
        </Link>
      ))}
    </div>
  );
};
export default Home;
