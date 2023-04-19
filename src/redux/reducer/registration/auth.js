import {
  SET_LOGIN,
  SET_LOGOUT,
  SET_POST,
  SET_REGISTER,
} from "../../action/type";

const user = JSON.parse(localStorage.getItem("login"));
const regUsers = JSON.parse(localStorage.getItem("registration"));
const post = [];
const initialState = {
  user: user
    ? { isLoggedIn: true, user, regUsers, post }
    : { isLoggedIn: false, user: null, regUsers, post },
};

const registrationInformation = (state = initialState, action) => {
  switch (action.type) {
    case SET_REGISTER:
      return {
        ...state,
      };

    case SET_LOGIN:
      return {
        ...state,
        isLoggedIn: true,
      };

    case SET_LOGOUT:
      return {
        ...state,
        isLoggedIn: false,
        user: null,
      };
    case SET_POST:
      return {
        ...state,
      };

    default:
      return state;
  }
};
export default registrationInformation;
