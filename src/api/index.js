import axios from "axios";
import decode from "jwt-decode";

export const API = axios.create({
  baseURL: "http://localhost:5000",
});

const instance = axios.create({});

// const instance = axios.create({
//   baseURL: "http://localhost:5000",
// });

async function generateRefershToken() {
  const user = JSON.parse(localStorage.getItem("user"));
  const { data } = await instance.post("http://localhost:5000/user/refresh", {
    refreshToken: user.refreshToken,
  });
  localStorage.setItem(
    "user",
    JSON.stringify({
      ...user,
      accessToken: data.accessToken,
      refreshToken: data.refreshToken,
    })
  );
  return data;
}

API.interceptors.request.use(
  async (req) => {
    const user = localStorage.getItem("user");
    if (user) {
      const user = JSON.parse(localStorage.getItem("user"));
      req.headers["authorization"] = `Bearer ${user.accessToken}`;
      const decoded = decode(user.accessToken);
      if (decoded.exp * 1000 < new Date().getTime()) {
        const data = await generateRefershToken();
        req.headers["authorization"] = `Bearer ${data.accessToken}`;
      }
    }

    return req;
  },
  (err) => Promise.reject(err)
);

// API.interceptors.response.use(
//   (res) => res,
//   async (err) => {
//     Promise.reject(err);
//   }
// );

export const fetchPosts = async (page) => await API.get(`/posts?page=${page}`);
export const fetchPost = async (id) => await API.get(`/posts/find/${id}`);
export const fetchPostsBySearch = async (searchQuery) =>
  await API.get(
    `/posts/search?searchQuery=${searchQuery.search || "none"}&tags=${
      searchQuery.tags
    }`
  );
export const createPost = async (newPost) => await API.post("/posts", newPost);
export const updatePost = async (id, updatedPost) =>
  await API.patch(`/posts/${id}`, updatedPost);

export const deletePost = async (id) => await API.delete(`/posts/${id}`);
export const likePost = async (id) => await API.patch(`/posts/${id}/likePost`);
export const comment = async (value, id) =>
  await API.post(`/posts/${id}`, { value });

export const registerUser = async (newUser) =>
  await API.post(`/user/register`, newUser);

export const signIN = async (data) => await API.post(`/user/login`, data);

export const userLogOut = async () => await API.post("/user/logout");
