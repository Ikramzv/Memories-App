import React from "react";
import useStyles from "./styles";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
} from "@material-ui/core";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import DeleteIcon from "@material-ui/icons/Delete";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import moment from "moment";
import { deletePost, like } from "../../../actions/posts";
import { useDispatch } from "react-redux";

function Post({ post, setCurrentId }) {
  const classes = useStyles();
  const dispatch = useDispatch();

  const deletePostWithId = (id) => {
    dispatch(deletePost(id));
  };

  const likePost = (id) => {
    dispatch(like(id));
  };

  return (
    <Card className={classes.card}>
      <CardMedia
        className={classes.media}
        image={post.selectedFile}
        title={post.title}
      />
      <div className={classes.overlay}>
        <Typography variant="h6">{post.name}</Typography>
        <Typography variant="body2">
          {moment(post.createdAt).fromNow()}
        </Typography>
      </div>
      <div className={classes.overlay2}>
        <Button
          style={{ color: "white" }}
          size="small"
          onClick={() => setCurrentId(post._id)}
        >
          <MoreHorizIcon fontSize="medium" />
        </Button>
      </div>
      <div className={classes.details}>
        <Typography variant="body2" color="textSecondary">
          {post.tags.map((tag) => `# ${tag}`)}
        </Typography>
      </div>
      <Typography className={classes.title} variant={"h5"} gutterBottom>
        {post.title}
      </Typography>
      <Typography
        className={classes.title}
        variant={"body2"}
        gutterBottom
        color="textSecondary"
        component={"p"}
      >
        {post.message}
      </Typography>
      <CardActions
        className={classes.cardActions}
        style={{ marginTop: "20px" }}
      >
        <Button size="small" color="primary" onClick={() => likePost(post._id)}>
          <ThumbUpAltIcon fontSize="small" />
          &nbsp; Like &nbsp;
          {post.likes.length}
        </Button>
        <Button
          size="small"
          color="primary"
          onClick={() => deletePostWithId(post._id)}
        >
          <DeleteIcon fontSize="small" />
          Delete
        </Button>
      </CardActions>
    </Card>
  );
}

export default Post;
