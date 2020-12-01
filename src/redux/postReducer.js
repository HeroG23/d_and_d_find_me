import { Switch } from "react-router-dom";

const initialState = {
    posts: []
};
const SET_POSTS = "SET_POSTS";

export function setPosts(posts){
    return{
        type: SET_POSTS,
        payload: posts
    }
}

export default function reducer(state = initialState, action){
    switch (action.type){
        case SET_POSTS:
            return {...state, posts: action.payload};
        default:
            return state;
    }
}