import { Container, Grid, Grow } from "@mui/material";
import React, { useEffect, useState } from "react";
import Posts from "../../components/Posts/Posts";
import Form from "../../components/Form/Form";
import { useMediaQuery, useTheme } from "@material-ui/core";
import { useDispatch } from "react-redux";
import { getPosts } from "../../actions/posts";

function Home() {
  const [currentId, setCurrentId] = useState(null);
  const dispatch = useDispatch();

  const theme = useTheme();
  const media = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    dispatch(getPosts());
  }, [media]);
  return (
    <Grow in>
      <Container>
        <Grid
          display={media ? "flex" : "flex"}
          flexDirection={media ? "column-reverse" : ""}
          container
          justifyContent="space-between"
          alignItems="stretch"
          spacing={3}
        >
          <Grid item xs={12} sm={7}>
            <Posts setCurrentId={setCurrentId} />
          </Grid>
          <Grid item xs={12} sm={4}>
            <Form currentId={currentId} setCurrentId={setCurrentId} />
          </Grid>
        </Grid>
      </Container>
    </Grow>
  );
}

export default Home;
