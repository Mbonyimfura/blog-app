import { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { userContext } from "./App";
import classes from './Post.module.css'

const Post = () => {
  const { id } = useParams();
  const [post, setPost] = useState({});
  const navigate = useNavigate();
  const user = useContext(userContext);
  useEffect(() => {
    axios
      .get("http://localhost:3000/post/getPostById/" + id)
      .then((result) => setPost(result.data))
      .catch((err) => console.log(err));
  }, []);
  const handleDelete = (id) => {
    axios
      .delete("http://localhost:3000/post/deletepost/" + id)
      .then((result) => {
        navigate("/home");
      })
      .catch((err) => console.log(err));
  };
  return (
    <div className="post_container">
      <div className="post_post">
        <img src={`http://localhost:3000/Public/Images/${post.file}`} alt="This is post image" />

        <h2>{post.title}</h2>
        <p>{post.description}</p>
        {user.username === post.username ? (
          <div className={classes['post_edit']}>
            <Link to={`/editpost/${post._id}`}>
              <button>Edit</button>
            </Link>
            <button onClick={(e) => handleDelete(post._id)}>Delete</button>
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};
export default Post;
