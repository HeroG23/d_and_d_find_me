import axios from "axios";
import { useState } from "react";
import "./CommForm.css";

const CommForm = ({history, 
  user: { username}, 
  post:{post_id}}) => {

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
      <form className="comm-form" onSubmit={(e) => commSubmit(e)}>
        <h2 className="title">{username}</h2>
        <div className="comm-input">
          <label>Body: </label>
          <input
            className="form-input"
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

export default CommForm
