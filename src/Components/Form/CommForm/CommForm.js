import { connect } from "react-redux";
import axios from "axios";
import { useState } from "react";
import "./CommForm.css";

const CommForm = ({history, 
  user: { username }, 
  posts:{post: {post_id}}}) => {
  const [body, setBody] = useState("");
  
  const commSubmit = (e) => {
    e.preventDefault();
    if (username) {
      axios
        .post("/api/comments", {body, post_id})
        .then((res) => history.push(`/posts/${post_id}`));
    } else {
      alert("Must be logged in to post a comment");
    }
  };

  return (
    <div className="CommForm content-box">
      <form onSubmit={(e) => commSubmit(e)}>
        <h2>{username}</h2>
        <div className="comm-input-form">
          <input
            className="comm-input"
            name="body"
            type="text"
            placeholder="Body"
            onChange={e => setBody(e.target.value)}
          />
        </div>
        <div className="comm-buttons">
          <button className="comm-button" type="submit">
            Post Comment!
          </button>
          <button className="comm-button" type="reset">
            Cancel Comment!
          </button>
        </div>
      </form>
    </div>
  );
}

const mapStateToProps = (state) => state;

export default connect(mapStateToProps)(CommForm);
