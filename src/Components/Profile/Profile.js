import axios from "axios";
import { connect } from "react-redux";
import { useState, useEffect } from "react";

const Profile = (props) => {
  const [posts, setPosts] = useState([]);
  const [comments, setComments] = useState([]);

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
    <div className="Profile">
      {posts.length < 1 ? (
        <div>Either no posts have been made or they are still loading</div>
      ) : (
        <></>
      )}
      {comments.length < 1 ? (
        <div>Either no comments or still loading</div>
      ) : (
        <></>
      )}
    </div>
  );
};

const mapStateToProps = (state) => state;
export default connect(mapStateToProps)(Profile);
