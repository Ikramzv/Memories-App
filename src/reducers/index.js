import { combineReducers } from "redux";
import posts from "./posts";
import loading from "./loading";
import user from "./user";

export default combineReducers({
  posts,
  loading,
  user,
});
