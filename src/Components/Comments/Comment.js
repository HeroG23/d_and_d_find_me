import { useState, useEffect } from "react";

const Comment = ({comment: {body, username, userId, comment_id}, currentUserId, updateComment, deleteComment}) => {
  const [edit, setEdit] = useState(false);
  const [newComment, setNewComment] = useState(body)

  return (
    <div className="Comment content-box">
      <div>
        <div className="comment-header">
          <h2>{username}</h2>
        </div>
      </div>
      {currentUserId === userId && !edit ? (
        <div>
          <button onClick={() => setEdit(!edit)}>Edit</button>
          <button onClick={()=> deleteComment(comment_id)}>Delete Comment</button>
        </div>
      ) : null}
      {currentUserId === userId && edit ? (
        <form onSubmit={() => {updateComment(comment_id, body); setEdit(!edit)}}>
          <input value={newComment} onChange={e => setNewComment(e.target.value)} />
          <button type="submit">Save</button>
          <button type="reset" onClick={() => setEdit(!edit)}>Cancel</button>
        </form>
      ) : (
        <div className="comment-body">
          <p>{body}</p>
        </div>
      )}
    </div>
  );
};

export default Comment
