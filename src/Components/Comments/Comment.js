import axios from "axios";
import { connect } from "react-redux";
import { useState } from "react";
// import { setComment } from "../../redux/commentReducer";

const Comment = ({comment, updateComment, deleteComment, user }) => {
  const [edit, setEdit] = useState(false);
  const [body, setBody] = useState(comment.body)
  return (
    <div className="Comment content-box">
      <div>
        <div className="comment-header">
          <h1>{comment.username}</h1>
        </div>
      </div>
      {user.user_id && edit ? (
        <form onSubmit={e => {setEdit(!edit); updateComment(e, comment.comment_id, body)}}>
          <input
            value={body}
            onChange={e => setBody(e.target.value)}
          />
          <button type="submit">Save</button>
          <button type="reset" onClick={() => setEdit(!edit)}>
            Cancel
          </button>
        </form>
      ) : (
        <div className="comment-body">
          <p>{comment.body}</p>
        </div>
      )}
      {user.user_id && !edit ? (
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