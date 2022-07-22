import { Container, Grid, Grow } from "@mui/material";
import React, { useEffect, useState } from "react";
import Posts from "../../components/Posts/Posts";
import Form from "../../components/Form/Form";
import { Paper, AppBar, TextField, Button } from "@material-ui/core";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { getPostBySearch } from "../../actions/posts";
import Pagination from "../Pagination";
import useStyles from "./styles";
import TagsInput from "./TagsInput";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function Home() {
  const [currentId, setCurrentId] = useState(null);
  const dispatch = useDispatch();
  const query = useQuery();
  const navigate = useNavigate();
  const page = query.get("page") || 1;
  const searchQuery = query.get("searchQuery");
  const [search, setSearch] = useState("");
  const [tags, setTags] = useState([]);
  const classes = useStyles();

  const handleKeyPress = (e) => {
    if (e.keyCode === 13) {
      // search post
    }
  };

  const searchPost = () => {
    if (search.trim() || tags.length > 0) {
      dispatch(
        getPostBySearch({
          search,
          tags: tags.join(","),
        })
      );
      navigate(
        `/posts/search?searchQuery=${search || "none"}&tags=${tags.join(",")}`
      );
    } else {
      navigate("/");
    }
  };

  useEffect(() => {}, [tags]);
  return (
    <Grow in>
      <Container maxWidth="xl">
        <Grid
          container
          justifyContent="space-between"
          alignItems="stretch"
          spacing={3}
          className={classes.gridContainer}
        >
          <Grid item xs={12} sm={6} md={9}>
            <Posts setCurrentId={setCurrentId} />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <AppBar
              className={classes.appBarSearch}
              position="static"
              color="inherit"
            >
              <TextField
                name="search"
                variant="outlined"
                label="Search Memories"
                onKeyPress={handleKeyPress}
                fullWidth
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <TagsInput
                style={{
                  margin: "10px 0",
                }}
                fullWidth
                selectedTags={(tags) => setTags(tags)}
                variant="outlined"
                label="Search Tags"
                name="tags"
              />
              <Button
                onClick={searchPost}
                className={classes.searchButton}
                color="primary"
                variant="contained"
              >
                Search
              </Button>
            </AppBar>
            <Form currentId={currentId} setCurrentId={setCurrentId} />
            <Paper elevation={6} style={{ marginTop: "10px" }}>
              <Pagination page={page} />
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Grow>
  );
}

export default Home;
