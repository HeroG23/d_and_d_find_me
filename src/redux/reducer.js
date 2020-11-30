const initialState = {username: '', dm: ''}

const USER = 'USER';
const LOGOUT = 'LOGOUT';

export function constUser(user){
    return {
        type:USER,
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
        case constUser:
            return{...state, username: payload.username, dm: payload.dm};
        case logout:
            return initialState;
        default:
            return state;
    }
}