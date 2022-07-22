import React, { useEffect } from "react";
import useStyles from "./styles";
import {
  Card,
  CardActions,
  CardMedia,
  Button,
  Typography,
} from "@material-ui/core";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import ThumbUpOutlinedIcon from "@material-ui/icons/ThumbUpOutlined";
import DeleteIcon from "@material-ui/icons/Delete";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import moment from "moment";
import { deletePost, like } from "../../../actions/posts";
import { useDispatch, useSelector } from "react-redux";

function Post({ post, setCurrentId }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const posts = useSelector((state) => state.posts);

  const deletePostWithId = (id) => {
    dispatch(deletePost(id));
  };

  const likePost = (id) => {
    dispatch(like(id));
  };

  const Likes = () => {
    if (post.likes.length > 0) {
      return (
        <>
          {post.likes.find((id) => id === user?._id) ? (
            <>
              <ThumbUpAltIcon />
              &nbsp;
              <span
                style={{
                  fontSize: "10px",
                  verticalAlign: "bottom",
                  transform: "translateY(5px)",
                }}
              >
                {post.likes.length > 2
                  ? `You and  ${post.likes.length - 1} others`
                  : `${post.likes.length} Like${
                      post.likes.length < 2 ? "" : "s"
                    } `}
              </span>
            </>
          ) : (
            <>
              <ThumbUpOutlinedIcon />
              &nbsp;
              <span
                style={{
                  fontSize: "10px",
                  verticalAlign: "bottom",
                  transform: "translateY(5px)",
                }}
              >
                {`${post.likes.length} other like${
                  post.likes.length > 1 ? "" : "s"
                }`}
              </span>
            </>
          )}
        </>
      );
    } else {
      return (
        <>
          <ThumbUpOutlinedIcon />
          &nbsp; Like
        </>
      );
    }
  };

  useEffect(() => {}, [posts]);

  return (
    <Card className={classes.card} id="card-scrollbar" raised elevation={6}>
      <CardMedia
        className={classes.media}
        image={post.selectedFile}
        title={post.title}
        children
      />
      <div className={classes.overlay}>
        <Typography variant="h6">{post.name}</Typography>
        <Typography variant="body2">
          {moment(post.createdAt, "DD.MM.YYYY hh:mm:ss").fromNow()}
        </Typography>
      </div>
      <div className={classes.overlay2}>
        {user?._id === post.creator && (
          <Button
            style={{ color: "white" }}
            size="small"
            onClick={() => setCurrentId(post._id)}
          >
            <MoreHorizIcon fontSize="medium" />
          </Button>
        )}
      </div>
      <div className={classes.details}>
        <Typography variant="body2" color="textSecondary">
          {post.tags.map((tag) => ` #${tag}`)}
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
        <Button
          size="small"
          color="primary"
          onClick={() => likePost(post._id)}
          disabled={!user}
        >
          <Likes />
        </Button>
        {user?._id === post.creator && (
          <Button
            size="small"
            color="primary"
            onClick={() => deletePostWithId(post._id)}
          >
            <DeleteIcon fontSize="small" />
            Delete
          </Button>
        )}
      </CardActions>
    </Card>
  );
}

export default Post;
