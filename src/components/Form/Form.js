import React, { useEffect, useState } from "react";
import useStyles from "./styles";
import Filebase from "react-file-base64";
import { TextField, Button, Typography, Paper } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { createPost, updatedPost } from "../../actions/posts";
import { useNavigate } from "react-router-dom";

const Form = ({ currentId, setCurrentId }) => {
  const [postData, setPostData] = useState({
    title: "",
    message: "",
    tags: "",
    selectedFile: "",
  });

  const post = useSelector((state) =>
    currentId ? state.posts.posts.find((post) => post._id === currentId) : ""
  );

  const user = useSelector((state) => state.user);

  const dispatch = useDispatch();

  const classes = useStyles();
  const navigate = useNavigate();

  const clear = () => {
    setPostData({
      title: "",
      message: "",
      tags: "",
      selectedFile: "",
    });
    setCurrentId(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (currentId) {
      dispatch(updatedPost(currentId, { ...postData, name: user.name }));
    } else {
      if (Object.entries(postData).find(([key, value]) => value === "")) {
        return alert(
          "Please fullfill all the possible field and then post the memorie"
        );
      }
      dispatch(createPost({ ...postData, name: user.name }, navigate));
    }
    clear();
  };

  useEffect(() => {
    if (post) {
      setPostData(post);
    }
  }, [post]);

  if (!user) {
    return (
      <Paper className={classes.paper} elevation={6}>
        <Typography variant="h5" align="center">
          Please sign in to create your own memories and like other's memories.
        </Typography>
      </Paper>
    );
  }

  return (
    <Paper className={classes.paper} elevation={6}>
      <form
        autoComplete="off"
        noValidate
        className={`${classes.form} ${classes.root} `}
        onSubmit={handleSubmit}
      >
        <Typography variant="h5">
          {currentId ? "Edit a Post" : "Creating a Memory"}
        </Typography>
        <TextField
          name="title"
          variant="outlined"
          label="Title"
          fullWidth
          value={postData.title}
          onChange={(e) => setPostData({ ...postData, title: e.target.value })}
        />
        <TextField
          name="message"
          variant="outlined"
          label="Message"
          multiline
          minRows={4}
          maxRows={10}
          fullWidth
          value={postData.message}
          onChange={(e) =>
            setPostData({ ...postData, message: e.target.value })
          }
        />
        <TextField
          name="tags"
          variant="outlined"
          label="Tags"
          fullWidth
          value={postData.tags}
          onChange={(e) =>
            setPostData({ ...postData, tags: e.target.value.split(",") })
          }
        />
        <div className={classes.fileInput}>
          <Filebase
            type="file"
            multiple={false}
            onDone={({ base64 }) =>
              setPostData({ ...postData, selectedFile: base64 })
            }
          />
        </div>
        <Button
          className={classes.buttonSubmit}
          variant="contained"
          color="primary"
          type={"submit"}
          size="large"
          fullWidth
        >
          SUBMIT
        </Button>
        <Button
          color="secondary"
          variant="contained"
          onClick={clear}
          fullWidth
          size="small"
        >
          CLEAR
        </Button>
      </form>
    </Paper>
  );
};

export default Form;
