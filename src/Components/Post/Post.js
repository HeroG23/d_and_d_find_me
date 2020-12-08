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
      const res = await axios.put(`api/comments/${comment_id}`, {body});
      setComments(res.data);
    } catch (err) {
      alert(err);
    }
  }

  const deleteComment = async comment_id => {
    await axios.delete(`/api/comments/${comment_id}`);
  }

  useEffect(() => {
    if (props.match !== undefined) {
      const getPost = async () => {
        try {
          const post = await axios.get(`/api/posts/${props.match.params.id}`);
          setPost({
            id: post.data.post_id,
            title: post.data.title,
            username: post.data.username,
            content: post.data.content,
            address: post.data.post_address,
            userId: post.data.user_id
          });
        } catch (err) {
          console.log(err);
        }
      }

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
  }, [deleteComment])

  return (
    
    <div className="Post content-box">
      {post === undefined ? (
        <div>Loading...</div>
      ) : (
        <div>
          <div>
            <div className="post-header">
              <h2 className="title" style = {{fontSize: '24px'}}> {post.title}</h2>
              <div className="author-box">
                <p>by {post.username}</p>
              </div>
            </div>
            {post.userId && edit ? (
              <form onSubmit={e => {setEdit(!edit); props.updatePost(e, post.id, post.content)}}>
                <input
                  value={post.content} 
                  onChange={e => setPost(e.target.value)}
                  />
                <input
                  value={post.address}
                  onChange={e => setPost(e.target.value)}
                />
                  <button type="submit">Save Update</button>
                  <button type="reset" onClick={()=> setEdit(!edit)}>
                    Cancel Update
                  </button>
              </form>
            ): (
            <div className="post-content">
              <p style={{fontSize: "24x"}}>{post.content}</p>
              <br />
              <p>{post.post_address}</p>
            </div>
            )}
            {post.userId && !edit? (
              <div>
                <button onClick={() => setEdit(!edit)}>Update Post</button>
                <button onClick={() => props.deletePost(post.id)}>Delete Post</button>
              </div>
            ): null}
          </div>
          <div className="createComment">
            {props.user.user_id && createComment ?
            <div> 
            <CommForm key = {post.post_id} post={post}/> <button onClick={() => setCreateComment(!createComment)}>Cancel Comment</button>
            </div> : null}
            {props.user.user_id && !createComment ?
              <button onClick={() => setCreateComment(!createComment)}>Comment</button>: null}
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
                {comments.map(comment => (
                  <li key={comment.comment_id}>
                    <Comment comment={comment} updateComment={updateComment} deleteComment={deleteComment} />
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

const mapStateToProps = state => state
export default connect(mapStateToProps)(Post);
