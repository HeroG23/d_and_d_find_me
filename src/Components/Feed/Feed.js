import {useState, useEffect} from 'react';
import axios from 'axios';
import Posts from '../Posts/Posts';
import {connect} from 'react-redux';

const Feed = () => {
    const [search, setSearch] = useState(""); 
    const [posts, setPosts] = useState([]);
    //#recieving posts
    useEffect(()=> {
        const getPosts = async () => {
            try {
                const posts = await axios.get('/api/posts');
                setPosts(posts.data);
            } catch(err) {
                alert(err)
            }
        };
        getPosts();
    }, [search]);
    //#post functions
    const updatePost = async (id, postAddress,content) => {
        try {
            const res = await axios.put(`/api/posts/${id}`, {postAddress, content});
            setPosts(res.data);
        } catch (err) {
            alert(err.response.request.response)
        }
    };
    const deletePost = async post_id => {
        await axios.delete(`/api/post/${post_id}`)
    }

    return (
        <div className = "Feed content-box">
            <div className="feed-header">Find Your Adventure
                <div className="search-container">
                    <input type="search" placeholder="Search by title" onChange={e => setSearch(e.target.value)}/>
                </div>
            </div>
            <main>
                {posts === undefined ? <img src='https://media1.giphy.com/media/sbqscIJh0n16w/giphy.webp?cid=ecf05e47c4t0fz8i9sy42u9c3do2i6wdjaqp3lo6ebxugkf7&rid=giphy.webp' alt="loading gif"/>
                    : (posts.map(posts => <Posts key={posts.post_id} posts={posts} deletePost={deletePost} updatePost={updatePost}/>)
                )}
            </main>    
        </div>
    )
}

const mapStateToProps = state => state

export default connect(mapStateToProps)(Feed)