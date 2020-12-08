import { useState, useEffect } from "react";
import axios from "axios";
import Post from "../Post/Post";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import CommForm from '../Forms/CommForm/CommForm'
// import { setPosts } from "../../redux/postReducer";
import "./Feed.css";

const Feed = () => {
  const [search, setSearch] = useState("");
  const [posts, setPosts] = useState([]);
  // //#recieving posts
  useEffect(() => {
    const getPosts = async () => {
      try {
        const posts = await axios.get("/api/posts");
        setPosts(posts.data);
        console.log("POSTSSSSSSSS", posts.data)
      } catch (err) {
        console.log('Feed problems', err)
      }
    };
    getPosts();
  }, [search]);


  const updatePost = async (id, content, post_address) => {
    try {
      const res = await axios.put(`/api/posts/${id}`, { content, post_address });
      setPosts(res.data);
    } catch (err) {
      alert(`Couldn't update post content`, err);
    }
  };

  const deletePost = async (id) => {
    await axios.delete(`/api/posts/${id}`);
  };

  return (
    <div className="Feed content-box">
      <div className="feed-header">
        <h1 style={{borderRadius: "5px"}}>Find Your Adventure</h1>
        <div className="search-container">
          <input
            type="search"
            placeholder="Search by title"
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>
      <main>
        {posts.length < 1 ? (
          <img
            src="https://media1.giphy.com/media/sbqscIJh0n16w/giphy.webp?cid=ecf05e47c4t0fz8i9sy42u9c3do2i6wdjaqp3lo6ebxugkf7&rid=giphy.webp"
            alt="loading gif"
          />
        ) : (
          <ul style={{ listStyle: "none" }}>
            {posts.map((post) => (
              <li key={post.post_id}>
                <Link
                  style={{ textDecoration: "none" }}
                  to={`/posts/${post.post_id}`}
                >
                  <Post post={post} updatePost={updatePost} deletePost={deletePost}/>
                </Link>
                <Link style={{textDecoration: "none",
              backgroundColor: " rgba(255, 255, 255, 0.418)"}} to="/commform">Create Comment!<CommForm post={post}/></Link>
              </li>
            ))}
          </ul>
        )}
      </main>
    </div>
  );
};

const mapStateToProps = (state) => state;

export default connect(mapStateToProps)(Feed);
