import axios from "axios";
import { connect } from "react-redux";
import { useState, useEffect } from "react";
import { setComment } from "../../redux/commentReducer";

const Comment = ({
  comment: { body, username, user_id, comment_id },
  currentUserId,
  updateComment,
  deleteComment,
}) => {
  const [edit, setEdit] = useState(false);
  const [newComment, setNewComment] = useState(body);

  useEffect(() => {
    const getComment = async () => {
      try {
        const comment = await axios.get(`/api/comments/${comment_id}`);
        setComment(comment.data);
      } catch(err){
          alert('Comment problems', err);
      }
    };
    getComment();
  }, [comment_id]);
  return (
    <div className="Comment content-box">
      <div>
        <div className="comment-header">
          <h2>{username}</h2>
        </div>
      </div>
      {currentUserId === user_id && edit ? (
        <form onSubmit={() => updateComment(comment_id)}>
          <input
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
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
      {currentUserId === user_id && !edit ? (
        <div>
          <button onClick={() => setEdit(!edit)}>Edit</button>
          <button onClick={() => deleteComment(comment_id)}>
            Delete Comment
          </button>
        </div>
      ) : null}
    </div>
  );
};

const mapStateToProps = state => state
export default connect(mapStateToProps, {setComment})(Comment);
