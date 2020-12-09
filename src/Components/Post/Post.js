import axios from "axios";
import { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
import Comment from "../Comments/Comment";
// import CommForm from '../Forms/CommForm/CommForm'
// import { setPost } from "../../redux/postReducer";
// import { setComments } from "../../redux/commentRducer";
import { connect } from "react-redux";
import "./Post.css";
import "../Comments/Comments.css";
import CommForm from "../Forms/CommForm/CommForm";

const Post = (props) => {
  const [comments, setComments] = useState([]);
  const [post, setPost] = useState(undefined);
  const [createComment, setCreateComment] = useState(false);
  const [edit, setEdit] = useState(false);

  const updateComment = async (e, comment_id, body) => {
    e.preventDefault();
    try {
      const res = await axios.put(`api/comments/${comment_id}`, { body });
      setComments(res.data);
    } catch (err) {
      alert(err);
    }
  };

  const deleteComment = async (comment_id) => {
    await axios.delete(`/api/comments/${comment_id}`);
  };

  const updatePost = async (id, content, post_address) => {
    try {
      const res = await axios.put(`/api/posts/${id}`, {
        content,
        post_address,
      });
      setPost(res.data);
    } catch (err) {
      alert(`Couldn't update post content`, err);
    }
  };

  const deletePost = async (id) => {
    await axios.delete(`/api/posts/${id}`);
    props.history.push("/feed");
  };

  const onSubmitPressed = (e) => {
    e.preventDefault();
    setEdit(!edit);
    updatePost(post.id, post.content, post.address);
  };

  //# fix this
  const commSubmit = async (e, body) => {
    e.preventDefault();
    if (props.user.username) {
      try {
        let res = await axios.post("/api/comments", { body, post_id: post.id });
        console.log(post);
        if (res.status === 200) {
          let message = await axios.post("/api/sendSMS", {
            name: props.user.username,
            message: res.data.body,
            user_id: post.userId,
          });
          if (message.status !== 200) {
            console.log("text failed");
          }
        }
      } catch (err) {
        console.log(err);
      }
      setCreateComment(!createComment);
    } else {
      alert("Must be logged in to post a comment");
    }
  };

  useEffect(() => {
    if (props.match !== undefined) {
      const getPost = async () => {
        try {
          const post = await axios.get(`/api/posts/${props.match.params.id}`);
          // setPost({
          //   id: post.data.post_id,
          //   title: post.data.title,
          //   username: post.data.username,
          //   content: post.data.content,
          //   address: post.data.post_address,
          //   userId: post.data.user_id,
          // });
          //# OR
          const {
            post_id: id,
            title,
            username,
            content,
            post_address: address,
            user_id: userId,
          } = post.data;
          setPost({ id, title, username, content, address, userId });
        } catch (err) {
          console.log(err);
        }
      };

      const getComments = async () => {
        try {
          const comments = await axios.get(
            `/api/posts/comments/${props.match.params.id}`
          );
          setComments(comments.data);
        } catch (err) {
          console.log(err);
        }
      };

      getComments();
      getPost();
    } else {
      setPost(props.post);
    }
  }, [props.match, props.post]);

  return (
    <div className="Post content-box">
      {post === undefined ? (
        <div>Loading...</div>
      ) : (
        <div>
          <div>
            <div className="post-header">
              <h2
                className="title"
                style={{
                  fontSize: "24px",
                  textDecoration: "underline",
                  margin: "1px",
                }}
              >
                {post.title}
              </h2>
              <div className="author-box">
                <p
                  style={{
                    margin: "2px",
                    fontSize: "18px",
                    fontWeight: "bold",
                  }}
                >
                  by {post.username}
                </p>
              </div>
            </div>
            {post.userId && edit ? (
              <form onSubmit={(e) => onSubmitPressed(e)}>
                <input
                  value={post.content}
                  onChange={(e) =>
                    setPost({ ...post, content: e.target.value })
                  }
                />
                <input
                  value={post.address}
                  onChange={(e) =>
                    setPost({ ...post, address: e.target.value })
                  }
                />
                <button type="submit">Save Update</button>
                <button type="reset" onClick={() => setEdit(!edit)}>
                  Cancel Update
                </button>
              </form>
            ) : (
              <div className="post-content">
                <p style={{ fontSize: "24x" }}>{post.content}</p>
                <br />
                <p>{post.address}</p>
              </div>
            )}
            {post.userId && !edit ? (
              <div>
                <button onClick={() => setEdit(!edit)}>Update Post</button>
                <button onClick={() => deletePost(post.id)}>Delete Post</button>
              </div>
            ) : null}
          </div>
          <div className="createComment">
            {props.user.user_id && createComment ? (
              <div>
                <CommForm
                  key={post.post_id}
                  post={post}
                  commSubmit={commSubmit}
                />{" "}
                <button onClick={() => setCreateComment(!createComment)}>
                  Cancel Comment
                </button>
              </div>
            ) : null}
            {props.user.user_id && !createComment ? (
              <button onClick={() => setCreateComment(!createComment)}>
                Comment
              </button>
            ) : null}
          </div>
          <div className="Comments content-Box">
            {comments.length < 1 ? (
              <div>
                <img
                  src="https://media1.giphy.com/media/sbqscIJh0n16w/giphy.webp?cid=ecf05e47c4t0fz8i9sy42u9c3do2i6wdjaqp3lo6ebxugkf7&rid=giphy.webp"
                  alt="loading gif"
                />
              </div>
            ) : (
              <ul style={{ listStyle: "none" }}>
                {comments.map((comment) => (
                  <li key={comment.comment_id}>
                    <Comment
                      comment={comment}
                      updateComment={updateComment}
                      deleteComment={deleteComment}
                    />
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

const mapStateToProps = (state) => state;
export default connect(mapStateToProps)(Post);
