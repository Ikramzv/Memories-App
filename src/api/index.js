import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000",
});

API.interceptors.request.use((req) => {
  if (localStorage.getItem("user")) {
    req.headers.authorization = `Bearer ${
      JSON.parse(localStorage.getItem("user"))?.token
    }`;
  }
  return req;
});

export const fetchPosts = async () => await API.get("/posts");
export const createPost = async (newPost) => await API.post("/posts", newPost);
export const updatePost = async (id, updatedPost) =>
  await API.patch(`/posts/${id}`, updatedPost);

export const deletePost = async (id) => await API.delete(`/posts/${id}`);
export const likePost = async (id) => await API.patch(`/posts/${id}/likePost`);

export const registerUser = async (newUser) =>
  await API.post(`/user/register`, newUser);

export const signIN = async (data) => await API.post(`/user/login`, data);
