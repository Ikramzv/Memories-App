import React, { useEffect } from "react";
import Post from "./Post/Post";
import useStyles from "./styles";
import { useSelector } from "react-redux";
import { Grid, CircularProgress } from "@material-ui/core";

const Posts = ({ setCurrentId }) => {
  const classes = useStyles();
  const posts = useSelector((state) => state.posts);
  const loading = useSelector((state) => state.loading);
  useEffect(() => {
    console.log(posts);
  }, [posts, loading]);
  return (
    <>
      {loading && (
        <CircularProgress
          style={{
            position: "fixed",
            width: "50px",
            height: "50px",
            zIndex: 1000,
            top: "48%",
            left: "50%",
            transform: "translateX(-50%)",
          }}
          size="large"
        />
      )}
      <Grid
        container
        className={classes.container}
        alignItems="stretch"
        spacing={3}
      >
        {posts.map((post) => (
          <Grid item xs={12} key={post._id} sm={6}>
            <Post post={post} setCurrentId={setCurrentId} />
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default Posts;
