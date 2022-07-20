import * as api from "../api";
import {
  FETCH_ALL,
  LIKE,
  SET_LOADING,
  UPDATE,
  DELETE,
  CREATE,
} from "../constants/actionTypes";

// Action creators

export const getPosts = () => async (dispatch) => {
  dispatch({
    type: SET_LOADING,
    payload: true,
  });
  try {
    const { data } = await api.fetchPosts();

    dispatch({
      type: FETCH_ALL,
      payload: data,
    });
    dispatch({
      type: SET_LOADING,
      payload: false,
    });
  } catch (err) {
    console.log(err);
  }
};

export const createPost = (post) => async (dispatch) => {
  dispatch({
    type: SET_LOADING,
    payload: true,
  });
  try {
    const { data } = await api.createPost(post);
    dispatch({
      type: CREATE,
      payload: data,
    });
    dispatch({
      type: SET_LOADING,
      payload: false,
    });
  } catch (err) {
    console.log(err);
  }
};

export const updatedPost = (id, updatedPost) => async (dispatch) => {
  dispatch({
    type: SET_LOADING,
    payload: true,
  });
  try {
    const { data } = await api.updatePost(id, updatedPost);
    dispatch({
      type: UPDATE,
      payload: data,
    });
    dispatch({
      type: SET_LOADING,
      payload: false,
    });
  } catch (err) {
    console.log("Error while updating post");
  }
};

export const deletePost = (id) => async (dispatch) => {
  dispatch({
    type: SET_LOADING,
    payload: true,
  });
  try {
    await api.deletePost(id);

    dispatch({
      type: DELETE,
      payload: id,
    });
    dispatch({
      type: SET_LOADING,
      payload: false,
    });
  } catch (err) {
    Promise.reject(err);
  }
};

export const like = (id) => async (dispatch) => {
  try {
    const { data } = await api.likePost(id);
    dispatch({
      type: LIKE,
      payload: data,
    });
  } catch (err) {
    Promise.reject(err);
  }
};
