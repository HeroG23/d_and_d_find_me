
const initialState = {
    posts: [],
    post: []
};
const SET_POSTS = "SET_POSTS";
const SET_POST ="SET_POST"

export function setPosts(posts){
    return{
        type: SET_POSTS,
        payload: posts
    }
}

export function setPost(post){
    return{
        type: SET_POST,
        payload: post
    }
}

export default function reducer(state = initialState, action){
    switch (action.type){
        case SET_POSTS:
            return {...state, posts: action.payload};
        case SET_POST:
            return {...state, post: action.payload};
        default:
            return state;
    }
}