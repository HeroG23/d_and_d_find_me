import { connect } from "react-redux";
import axios from "axios";
import { useState } from "react";
import "./Form.css";

function Form(props) {
  const [state, setState] = useState({
    title: "",
    content: "",
    postAddress: "",
  });
  const formArr = [
    { label: "title", type: "text" },
    { label: "content", type: "text" },
    { label: "postAddress", type: "text" },
  ];

  const changeHandle = (e) =>
    setState({ ...state, [e.target.name]: e.target.value });
  const submit = (e) => {
    e.preventDefault();
    const { userId } = props;
    if (userId) {
      axios
        .post("/api/posts", { ...state, userId })
        .then((res) => props.history.push("/feed"));
    } else {
      alert("Must be logged in to create posts");
    }
  };

  const formMapped = formArr.map((input) => (
    <div className="post-form" key={input.label}>
      <label>{input.label}: </label>
      <input
        name={input.label}
        type={input.type}
        placeholder={input.label}
        onChange={(e) => changeHandle(e)}
      />
    </div>
  ));

  return (
    <div className="Form content-box">
      <form onSubmit={(e) => submit(e)}>
        <h2 className="title">New Post</h2>
        {formMapped}
        <div className="form-buttons">
          <button className="form-button" type="submit">
            Submit Post!
          </button>
          <button className="form-button" type="reset">
            Cancel Post!
          </button>
        </div>
      </form>
    </div>
  );
}

export default connect((state) => state)(Form);
