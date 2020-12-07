import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Comment from "../Comments/Comment";
import { setPost } from "../../redux/postReducer";
import { setComments } from "../../redux/commentReducer";
import { connect } from "react-redux";
import "./Post.css";
import "../Comments/Comments.css";

const Post = (props) => {
  const [comments, setCommentsState] = useState(undefined);
  const [post, setPostState] = useState({id: null, title: "", content: "", address:""});
  const [edit, setEdit] = useState(false);

  useEffect(() => {
    const getPost = async () => {
      try {
        const post = await axios.get(`/api/posts/${props.match.params.id}`);
        setPostState({
          id: post.post_id,
          title: post.title,
          content: post.content,
          address: post.post_address,
        });
      } catch (err) {
        // alert("Post problems", err);
      }
    };
    getPost();
  }, []);

  useEffect(() => {
    const getComments = async () => {
      try {
        const comments = await axios.get(
          `/api/posts/comments/${props.match.params.id}`
        );
        setComments(comments.data);
        setCommentsState(comments.data);
      } catch (err) {
        // alert("Post-comment problems", err);
      }
    };
    getComments();
  }, []);

  const updatePostContent = async ([id, content]) => {
    try {
      const res = await axios.put(`/api/posts/${id}`, {  content });
      setPost(res.data)
      setPostState(res.data);
    } catch (err) {
      alert(`Couldn't update post content`, err);
    }
  };

  const updatePostAddress = async([id, post_address]) => {
    try{
      const res = await axios.put(`/api/posts/${id}`, {post_address});
      setPostState(res.data);
    } catch (err){
      alert(`Couldn't update post address`, err)
    }
  };
  
  const deletePost = async (id) => {
    await axios.delete(`/api/posts/${id}`);
  };

  return (
    <div className="Post content-box">
      {console.log("post components props", props)}
      <div>
        <div className="post-header">
          <h2 className="title"> {post.title}</h2>
          <div className="author-box">
            <p>by {props.user.username}</p>
          </div>
        </div>
        <div className="post-content">
          <p>{post.content}</p>
          <br />
          <p>{post.post_address}</p>
        </div>
      </div>
      <div className="Comments content-Box">
        {comments === undefined ? (
          <div>
            {console.log("comments indentifier", comments)}
            <img
              src="https://media1.giphy.com/media/sbqscIJh0n16w/giphy.webp?cid=ecf05e47c4t0fz8i9sy42u9c3do2i6wdjaqp3lo6ebxugkf7&rid=giphy.webp"
              alt="loading gif"
            />
            <Link style={{textDecoration: "none"}} to="/commform">Create Comment!</Link>
          </div>
        ) : (
          <ul style={{ listStyle: "none" }}>
            {comments.map((comment, post) => (
              <li>
                <Link style={{textDecoration: "none"}}to={`/comments/${comment.comment_id}`}>
                  <Comment
                    key={comment.comment_id}
                    comment={comment}
                    post={post}
                    user={props.user}
                  />
                </Link>
              </li>
            ))}
            <Link style={{textDecoration:"none"}} to="/commform">Create Comment!</Link>
          </ul>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => state;
export default connect(mapStateToProps, {setPost, setComments})(Post);
