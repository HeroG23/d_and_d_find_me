import axios from "axios";
import { connect } from "react-redux";
import { useState, useEffect } from "react";
import ProfilePost from "./ProfilePost";
import ProfileComment from "./ProfileComment";

const styles = {
  name: { fontSize: "28px", fontWeight: "600" },
  dm: { fontSize: "22px", fontWeight: "500" },
};

const Profile = (props) => {
  const [posts, setPosts] = useState([]);
  const [comments, setComments] = useState([]);
  const [display, setDisplay] = useState(false);

  useEffect(() => {
    const getUserPosts = async () => {
      try {
        const posts = await axios.get(`/api/user/posts/${props.user.user_id}`);
        setPosts(posts.data);
      } catch (err) {
        console.log(err);
      }
    };
    const getUserComments = async () => {
      try {
        const comments = await axios.get(
          `/api/user/comments/${props.user.user_id}`
        );
        setComments(comments.data);
      } catch (err) {
        console.log(err);
      }
    };
    getUserPosts();
    getUserComments();
  }, []);

  return (
    <div className="Profile content-box">
      {console.log(props)}
      <div className="user-info" style={{ border: "2px solid black" }}>
        <h1
          style={{
            fontSize: "32px",
            fontWeight: "700",
          }}
        >
          {props.user.username}
        </h1>
        <h2 style={styles.name}>{props.user.first_name}</h2>
        <h2 style={styles.name}>{props.user.last_name}</h2>
        {props.user.dm ? (
          <h3 style={styles.dm}>I am a DM</h3>
        ) : (
          <h3 style={styles.dm}>I am just a mere adventurer</h3>
        )}
      </div>
      <div className="profile-container" style={{ border: "1px solid white" }}>
        {posts.length < 1 ? (
          <div>Loading User Posts..</div>
        ) : (
          <div>
            {
              <ul style={{ listStyle: "none" }}>
                {posts.map((post) => (
                  <li key={post.post_id}>
                    <ProfilePost post={post} />
                  </li>
                ))}
              </ul>
            }
          </div>
        )}
        {comments.length < 1 ? (
          <div>Loading User Comments...</div>
        ) : (
          <div>
            <ul style={{ listStyle: "none" }}>
              {comments.map((comment) => (
                <li key={comment.comment_id}>
                  <ProfileComment comment={comment} />
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => state;
export default connect(mapStateToProps)(Profile);
