import { useState, useEffect } from "react";
import axios from "axios";
import Post from "../Post/Post";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Graph from '../Graph/Graph';
// import { setPosts } from "../../redux/postReducer";
import "./Feed.css";

const Feed = () => {
  const [search, setSearch] = useState("");
  const [posts, setPosts] = useState([]);

  //#recieving posts
  useEffect(() => {
    const getPosts = async () => {
      try {
        const posts = await axios.get("/api/posts");
        setPosts(posts.data);
      } catch (err) {
        console.log("Feed problems", err);
      }
    };
    getPosts();
  }, [search]);

  return (
    <div className="Feed content-box">
      <div className="feed-header">
        <h1 style={{ borderRadius: "5px" }}>Find Your Adventure</h1>
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
                  style={{ textDecoration: "none", color: "black" }}
                  to={`/posts/${post.post_id}`}
                >
                  <Post post={post} />
                </Link>
              </li>
            ))}
          </ul>
        )}
      </main>
      <div>
        <Graph/>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => state;

export default connect(mapStateToProps)(Feed);
