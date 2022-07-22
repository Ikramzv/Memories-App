import React, { useEffect } from "react";
import { Pagination, PaginationItem } from "@material-ui/lab";
import useStyles from "./styles";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getPosts } from "../actions/posts";

function Paginate({ page }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { numberOfPages, currentPage } = useSelector((state) => state.posts);

  useEffect(() => {
    if (page) dispatch(getPosts(page));
  }, [page]);
  return (
    <Pagination
      classes={{ ul: classes.ul }}
      count={numberOfPages}
      page={Number(currentPage) || 1}
      variant="outlined"
      color="primary"
      renderItem={(item) => {
        return (
          <PaginationItem
            {...item}
            component={Link}
            to={`/posts?page=${item.page}`}
          />
        );
      }}
    />
  );
}

export default Paginate;
