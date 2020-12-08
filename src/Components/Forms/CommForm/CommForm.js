// import axios from "axios";
import { useState } from "react";
import {connect} from "react-redux"
import "./CommForm.css";

const CommForm = ({history, user, post, commSubmit}) => {

  const [body, setBody] = useState("");

  return (
    <div className="CommForm content-box">
      <form className="comm-form" onSubmit={(e) => commSubmit(e, body)}>
        <h2 className="title">{user.username}</h2>
        <div className="comm-input">
          <label> Comment: </label>
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
        </div>
      </form>
    </div>
  );
}

const mapStateToProps = state => state;

export default connect(mapStateToProps)(CommForm)
