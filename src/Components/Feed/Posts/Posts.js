const Posts = ({
  posts: { title, username, content, post_address },
  updatePost,
  deletePost,
}) => {
  return (
    <div className="Posts content-box">
      <div className="post-header">
        <h2 className="title"> {title}</h2>
        <div className="author-box">
          <p>by {username}</p>
        </div>
      </div>
      <div className="post-content">
        <p>{content}</p>
        <br />
        <p>{post_address}</p>
      </div>
    </div>
  );
};

export default Posts;