import axios from "axios";
import { useState, useEffect } from "react";
import {setPost} from '../../redux/postReducer';
import {connect} from 'react-redux'

const Posts = ({match, post: {title, content, post_address}, user: {username}}) => {
  const [loading, setLoading] = useState(true)
  
   useEffect(() => {
     const getPost = async () =>{
       try{ 
         const post = await axios.get(`/api/posts/${match.params.id}`)
         setPost(post.data)
         setLoading(false)
       } catch (err){
         alert(err)
       }
     }
     getPost()
   }, []);

  return (
    <div className="Posts content-box">
      {!loading && title ? (
        <div>
          <div className="post-header">
            <h2 className="title"> {title}</h2>
            <div className="author-box">
              <p>by {username}</p>
            </div>
          </div>
          <div className="post-content">
            <p>{content}</p>
            <br/>
            <p>{post_address}</p>
          </div>
        </div>
      ) : (
        <div className="loading-box">
          <div className="loading-background"></div>
          <div className="loading"></div>
        </div>
        )
      }
    </div>
  )
};

const mapStateToProps = state => state
export default connect(mapStateToProps, {setPost})(Posts)