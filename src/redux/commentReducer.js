const initialState = {
    comments: []
};

const SET_COMMENTS = "SET_COMMENTS";

export function setComments(comments){
    return {
        type: SET_COMMENTS,
        payload: comments
    }
};

export default function reducer(state = initialState, action){
    switch(action.type){
        case SET_COMMENTS:
            return {...state, comments: action.payload}
        default:
            return state;
    }
}