const initialState = {username: '', dm: '', user_id: ''}

const GET_USER = 'GET_USER';
const LOGOUT = 'LOGOUT';


export function getUser(user){
    return {
        type: GET_USER,
        payload: user
    }
}

export function logout(){
    return{
        type: LOGOUT
    }
}

export default function reducer(state = initialState, action){
    let {type, payload} = action;
    switch(type){
        case GET_USER:
            return{...state, username: payload.username, dm: payload.dm, user_id: payload.user_id};
        case LOGOUT:
            return initialState;
        default:
            return state;
    }
}