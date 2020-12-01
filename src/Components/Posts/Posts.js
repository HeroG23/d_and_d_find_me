import axios from "axios";
import { useState, useEffect } from "react";
import {useMatch} from 'react-router-dom';
import {setPosts} from '../../redux/postReducer';

const Posts = (props) => {

  const [title, setTitle] = useState(props.post.title);
  const [content, setContent] = useState(props.post.content);
  const [location, setLocation] = useState(props.post.post_address);
  const [author, setAuthor] = useState(props.user.username);
  const [loading, setLoading] = useState(true)
  const [edit, setEdit] = useState(false);
  
  const match = useMatch();
  
   useEffect(() => {
     const getPosts = () =>{
       try{ 
         const post = await axios.get(`/api/posts/${props.match.params.id}`)
         setPosts(post.data)
       } catch (err){
         alert(err)
       }
     }
     getPosts()
   }, []);

  return (
    <div className="Posts content-box">
      {!loading && title ? (
        <div>
          <div className="post-header">
            <h2 className="title"> {title}</h2>
            <div className="author-box">
              <p>by {author}</p>
            </div>
          </div>
          <div className="post-content">
            <p>{content}</p>
            <br/>
            <p>{location}</p>
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

export default Posts