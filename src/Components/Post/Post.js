import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Comment from "../Comments/Comment";
import { setPost } from "../../redux/postReducer";
import { setComments } from "../../redux/commentReducer";
import { connect } from "react-redux";
import "./Post.css";
import "../Comments/Comments.css";

const Post = ({
  posts: {
    post: { post_id, title, content, post_address },
  },
  user: { username },
  deletePost,
  updatePost,
}) => {
  const [comments, setCommentsState] = useState(undefined);
  const [edit, setEdit] = useState(false);

  useEffect(() => {
    const getComments = async () => {
      try {
        const comments = await axios.get(`/api/posts/comments/${post_id}`);
        setComments(comments.data);
        setCommentsState(comments.data);
      } catch (err) {
        alert('Post-comment problems', err);
      }
    };
    getComments();
  }, [post_id]);
  useEffect(() => {
    const getPost = async () => {
      try {
        const post = await axios.get(`/api/posts/${post_id}`);
        setPost(post.data);
      } catch (err) {
        alert('Post problems', err);
      }
    };
    getPost();
  }, [post_id]);

  const updateComment = async ([id, body]) => {
    try {
      const res = await axios.put(`api/comments/${+id}`, body);
      setComments(res.data);
    } catch (err) {
      alert(err);
    }
  };

  const deleteComment = async (comment_id) => {
    await axios.delete(`/api/comments/${comment_id}`);
  };

  return (
    <div className="Post content-box">
      <div>
        <div className="post-header">
          <h2 className="title"> {title}</h2>
          <div className="author-box">
            <p>by {username}</p>
          </div>
        </div>
        <div className="post-content">
          <p>{content}</p>
          <br />
          <p>{post_address}</p>
        </div>
      </div>
      <div className="Comments content-Box">
        {comments === undefined ? (
          <div>
            <img
              src="https://media1.giphy.com/media/sbqscIJh0n16w/giphy.webp?cid=ecf05e47c4t0fz8i9sy42u9c3do2i6wdjaqp3lo6ebxugkf7&rid=giphy.webp"
              alt="loading gif"
            />
            <Link to="/commform">Comment!</Link>
          </div>
        ) : (
          <ul style={{ listStyle: "none" }}>
            {comments.map((comments) => (
              <Link to={`/comments/${comments.comment_id}`}>
                <Comment
                  key={comments.comment_id}
                  comments={comments}
                  updateComment={updateComment}
                  deleteComment={deleteComment}
                />
              </Link>
            ))}
            <Link to="/commform">Comment!</Link>
          </ul>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => state;
export default connect(mapStateToProps, { setPost })(Post);
