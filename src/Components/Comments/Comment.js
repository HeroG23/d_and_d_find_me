import { useState, useEffect } from "react";
import axios from "axios";
import { setComment } from "../../redux/commentReducer";
import { connect } from "react-redux";

const Comment = ({
  match,
  comments: { comment: body },
  user: { username },
  post: { post_id },
  updateComment,
  deleteComment,
}) => {
  const [edit, setEdit] = useState(false);
  useEffect(() => {
    const getComm = async () => {
      try {
        const comment = await axios.get(
          `/api/comments/${match.params.id}`,
          body,
          post_id
        );
        setComment(comment.data);
      } catch (err) {
        alert(err);
      }
    };
    getComm();
  }, []);

  return (
    <div className="Comment content-box">
      <div>
        <div className="comment-header">
          <h2>{username}</h2>
        </div>
      </div>
      <div className="comment-body">
        <p>{body}</p>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => state;
export default connect(mapStateToProps, { setComment })(Comment);
