import React, { useEffect, useState } from "react";
import useStyles from "./styles";
import {
  Card,
  CardActions,
  CardMedia,
  Button,
  Typography,
  ButtonBase,
} from "@material-ui/core";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import ThumbUpOutlinedIcon from "@material-ui/icons/ThumbUpOutlined";
import DeleteIcon from "@material-ui/icons/Delete";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import moment from "moment";
import { deletePost, like } from "../../../actions/posts";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function Post({ post, setCurrentId }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const posts = useSelector((state) => state.posts);
  const navigate = useNavigate();
  const [likes, setLikes] = useState([]);

  const deletePostWithId = (id) => {
    dispatch(deletePost(id));
  };

  const openPost = () => {
    navigate(`/posts/${post._id}`);
  };

  const handleLike = () => {
    dispatch(like(post._id));
    if (post?.likes.find((id) => id === user?._id)) {
      setLikes(post.likes.filter((id) => id !== user._id));
    } else {
      setLikes([...likes, user._id]);
    }
  };

  const Likes = () => {
    if (likes.length > 0) {
      return (
        <>
          {likes.find((id) => id === user?._id) ? (
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
                {likes.length > 2
                  ? `You and  ${likes.length - 1} others`
                  : `${likes.length} Like${likes.length < 2 ? "" : "s"} `}
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
                {`${likes.length} other like${likes.length > 1 ? "" : "s"}`}
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

  useEffect(() => {
    setLikes(post?.likes);
  }, [posts]);

  return (
    <div className={classes.containerCard}>
      <Card className={classes.card} id="card-scrollbar" raised elevation={6}>
        <CardMedia
          className={classes.media}
          image={post?.selectedFile}
          title={post.title}
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
        <div onClick={openPost} className={classes.openPost}>
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
        </div>
      </Card>
      <CardActions
        className={classes.cardActions}
        style={{ marginTop: "20px" }}
      >
        <Button
          size="small"
          color="primary"
          onClick={handleLike}
          disabled={!user}
        >
          <Likes />
        </Button>
        {user?._id === post.creator && (
          <Button
            size="small"
            color="secondary"
            onClick={() => deletePostWithId(post._id)}
          >
            <DeleteIcon fontSize="small" />
            Delete
          </Button>
        )}
      </CardActions>
    </div>
  );
}

export default Post;
