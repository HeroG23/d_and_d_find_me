import { useState } from "react";

const Posts = (props) => {
  const [content, setContent] = useState(props.post.content);
  const [location, setLocation] = useState(props.post.post_url);
  const [edit, setEdit] = useState(false);

  return (
    <li style={{ border: "1px solid black" }}>
      {edit ? (
        <div>
          <input
            value={content}
            type="text"
            onChange={(e) => setContent(e.target.value)}
          />
          <input
            value={location}
            type="text"
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>
      ) : (
        <h2>{props.post.content}</h2>
      )}
      <h2> can meet at : {props.post.post_url}</h2>
      {edit ? (
        <div>
          <button
            onClick={() => {
              setContent(props.post.content);
              setLocation(props.post.post_url);
              setEdit(!edit);
            }}
          >
            Cancel
          </button>
          <button
            onClick={() => {
              props.updatePost(props.post.post_id, content, post_url);
              setEdit(!edit);
            }}
          >
            Save
          </button>
        </div>
      ) : (
        <button
          onClick={() => {
            setEdit(!edit);
          }}
        >
          Edit
        </button>
      )}
    </li>
  );
};

export default Posts