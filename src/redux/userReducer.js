const initialState = {
  first_name: "",
  last_name: "",
  phone_number: "",
  email: "",
  username: "",
  dm: "",
  online: "",
  user_id: "",
};

const GET_USER = "GET_USER";
const LOGOUT = "LOGOUT";

export function getUser(user) {
  return {
    type: GET_USER,
    payload: user,
  };
}

export function logout() {
  return {
    type: LOGOUT,
  };
}

export default function reducer(state = initialState, action) {
  let { type, payload } = action;
  switch (type) {
    case GET_USER:
      return {
        ...state,
        first_name: payload.first_name,
        last_name: payload.last_name,
        phone_number: payload.phone_number,
        email: payload.email,
        username: payload.username,
        dm: payload.dm,
        online: payload.online,
        user_id: payload.user_id,
      };
    case LOGOUT:
      return initialState;
    default:
      return state;
  }
}
