import { registerUser, signIN } from "../api";
import { SET_USER } from "../constants/actionTypes";

export const register = (newUser) => async (dispatch) => {
  const { data } = await registerUser(newUser);
  try {
    dispatch({
      type: SET_USER,
      payload: data,
    });
    localStorage.setItem("user", JSON.stringify(data));
  } catch (err) {
    alert("No valid email or password ");
    console.log(err);
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
    console.log(err);
    alert("Email or Password are no valid");
  }
};
