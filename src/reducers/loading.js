import { SET_LOADING } from "../constants/actionTypes";

export default (loading = false, action) => {
  switch (action.type) {
    case SET_LOADING:
      return (loading = action.payload);
    default:
      return (loading = false);
  }
};
