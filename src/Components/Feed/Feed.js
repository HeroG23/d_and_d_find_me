import {useState, useEffect} from 'react';
import axios from 'axios';
import Posts from '../Posts/Posts';
import {connect} from 'react-redux';

const Feed = (props) => {
    const [posts, setPosts] = useState([]);

    useEffect(()=> {
        const getPosts = async () => {
            try {
                const res = await axios.get('/api/posts');
                setPosts(res.data);
            } catch(err) {
                alert(err.response.request.response)
            }
        };
        getPosts();
    }, []);

    const updatePost = async (id, postAddress,content) => {
        try {
            const res = await axios.put(`/api/posts/${id}`, {postAddress, content});
            setPosts(res.data);
        } catch (err) {
            alert(err.response.request.response)
        }
    };

    const mappedPosts = posts.map((post, index) => {
        return (
            <Posts key = {`${post.post_id}-${index}`} post = {post} updatePost={updatePost}/>
        )
    });

    return (
        <div>
            <div>Find Your Adventure</div>
            <p>{props.post ? props.post.title : null}</p>
            <ul style={{listStyle: "none"}}>{mappedPosts}</ul>
        </div>
    )
}

const mapStateToProps = state => state

export default connect(mapStateToProps)(Feed)