import { registerUser, signIN, userLogOut } from "../api";
import { LOGOUT, SET_USER } from "../constants/actionTypes";

export const register = (newUser) => async (dispatch) => {
  try {
    const { data } = await registerUser(newUser);
    dispatch({
      type: SET_USER,
      payload: data,
    });
    localStorage.setItem("user", JSON.stringify(data));
  } catch (err) {
    alert(err.response.data);
  }
};

export const signIn = (userData) => async (dispatch) => {
  try {
    const { data } = await signIN(userData);
    dispatch({
      type: SET_USER,
      payload: data,
    });
    localStorage.setItem("user", JSON.stringify(data));
  } catch (err) {
    alert(err.response.data);
  }
};

export const logOut = () => async (dispatch) => {
  try {
    dispatch({
      type: LOGOUT,
    });
    return await userLogOut();
  } catch (err) {
    console.log(err.response.data);
  }
};
