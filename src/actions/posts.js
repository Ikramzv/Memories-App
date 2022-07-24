import * as api from "../api";
import {
  FETCH_ALL,
  LIKE,
  SET_LOADING,
  UPDATE,
  DELETE,
  CREATE,
  FETCH_BY_SEARCH,
  FETCH_POST,
  COMMENT,
} from "../constants/actionTypes";

// Action creators

export const getPosts = (page) => async (dispatch) => {
  dispatch({
    type: SET_LOADING,
    payload: true,
  });
  try {
    const { data } = await api.fetchPosts(page);
    dispatch({
      type: FETCH_ALL,
      payload: data,
    });
  } catch (err) {
    console.log(err);
  }
  dispatch({
    type: SET_LOADING,
    payload: false,
  });
};

export const getPost = (id) => async (dispatch) => {
  dispatch({
    type: SET_LOADING,
    payload: true,
  });
  try {
    const { data } = await api.fetchPost(id);
    dispatch({
      type: FETCH_POST,
      payload: data,
    });
  } catch (err) {
    Promise.reject(err);
  }
  dispatch({
    type: SET_LOADING,
    payload: false,
  });
};

export const getPostBySearch = (searchQuery) => async (dispatch) => {
  dispatch({
    type: SET_LOADING,
    payload: true,
  });
  try {
    const { data } = await api.fetchPostsBySearch(searchQuery);
    dispatch({
      type: FETCH_BY_SEARCH,
      payload: data,
    });
  } catch (err) {
    Promise.reject(err);
  }
  dispatch({
    type: SET_LOADING,
    payload: false,
  });
};

export const createPost = (post, navigate) => async (dispatch) => {
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
    navigate("/posts/" + data._id);
  } catch (err) {
    console.log(err);
  }
  dispatch({
    type: SET_LOADING,
    payload: false,
  });
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
  } catch (err) {
    console.log("Error while updating post");
  }
  dispatch({
    type: SET_LOADING,
    payload: false,
  });
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
  } catch (err) {
    Promise.reject(err);
  }
  dispatch({
    type: SET_LOADING,
    payload: false,
  });
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

export const commentPost = (value, id) => async (dispatch) => {
  try {
    const { data } = await api.comment(value, id);
    dispatch({
      type: COMMENT,
      payload: data,
    });
    return data.comment;
  } catch (error) {
    alert(error.response.data);
  }
};
