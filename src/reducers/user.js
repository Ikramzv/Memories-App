import { LOGOUT, SET_USER } from "../constants/actionTypes";

export default (user = JSON.parse(localStorage.getItem("user")), action) => {
  switch (action.type) {
    case SET_USER: {
      return (user = action.payload);
    }
    case LOGOUT:
      return (user = null);
    default:
      return user;
  }
};
