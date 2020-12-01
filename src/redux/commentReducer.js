const initialState = {
    comments: [],
    comment: []
};

const SET_COMMENTS = "SET_COMMENTS";
const SET_COMMENT = "SET_COMMENT";

export function setComments(comments){
    return {
        type: SET_COMMENTS,
        payload: comments
    }
};

export function setComment(comment){
    return{
        type: SET_COMMENT,
        payload: comment
    }
}

export default function reducer(state = initialState, action){
    switch(action.type){
        case SET_COMMENTS:
            return {...state, comments: action.payload}
        case SET_COMMENT:
            return {...state, comment: action.payload}
        default:
            return state;
    }
}