import axios from "axios";
import { connect } from "react-redux";
import { useState, useEffect } from "react";
// import { setComment } from "../../redux/commentReducer";

const Comment = (props) => {
  const [edit, setEdit] = useState(false);
  const [comment, setComment] = useState({id: null, body: "", postId: "", userId: ""});
  const [body, setBody] = useState("")

  useEffect(() => {
    const getComment = async () => {
      try {
        const comment = await axios.get(`/api/comments/${props.match.params.id}`);
        setComment({id: comment.comment_id, body: comment.body, postId: props.post.post_id, userId: props.user.user_id});
        setBody(comment.body)
      } catch(err){
          alert('Comment problems', err);
      }
    };
    getComment();
  }, []);

  const updateComment = async (body) => {
    try {
      const res = await axios.put(`api/comments/${props.match.params.id}`, {body});
      console.log(res.data)
      setComment(res.data);
      setBody(res.data)
    } catch (err) {
      alert(err);
    }
  };

  const deleteComment = async () => {
    await axios.delete(`/api/comments/${props.match.params.id}`);
  };

  return (
    <div className="Comment content-box">
      <div>
        <div className="comment-header">
          <h2>{props.user.username}</h2>
        </div>
      </div>
      { props.user.user_id && edit ? (
        <form onSubmit={() => updateComment(comment.body)}>
          <input
            value={comment.body}
            onChange={(e) => setComment(
            {...comment,
              body :e.target.value}
            )}
          />
          <button type="submit">Save</button>
          <button type="reset" onClick={() => setEdit(!edit)}>
            Cancel
          </button>
        </form>
      ) : (
        <div className="comment-body">
          <p>{body}</p>
        </div>
      )}
      { props.user.user_id && !edit ? (
        <div>
          <button onClick={() => setEdit(!edit)}>Edit</button>
          <button onClick={() => deleteComment(comment.comment_id)}>
            Delete Comment
          </button>
        </div>
      ) : null}
    </div>
  );
};

const mapStateToProps = state => state
export default connect(mapStateToProps)(Comment);
