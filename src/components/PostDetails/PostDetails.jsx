import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Paper,
  Typography,
  CircularProgress,
  Divider,
  Card,
} from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import useStyles from "./styles";
import { getPost, getPostBySearch } from "../../actions/posts";
import CommentSection from "./CommentSection";

function PostDetails() {
  const { post, posts } = useSelector((state) => state.posts);
  const loading = useSelector((state) => state.loading);
  const dispatch = useDispatch();
  const { id } = useParams();
  const navigate = useNavigate();
  const classes = useStyles();

  useEffect(() => {
    dispatch(getPost(id));
  }, [id]);

  useEffect(() => {
    if (post) {
      dispatch(
        getPostBySearch({
          search: "none",
          tags: post?.tags.join(","),
        })
      );
    }
  }, [post]);

  const recommendedPosts = posts.filter(({ _id }) => _id !== post?._id);

  const openPost = (id) => {
    navigate("/posts/" + id);
  };

  return (
    <React.Fragment>
      {loading && (
        <CircularProgress
          size={"lg"}
          style={{
            position: "fixed",
            width: "50px",
            height: "50px",
            zIndex: 1000,
            top: "48%",
            left: "50%",
            transform: "translateX(-50%)",
          }}
        />
      )}
      <Paper>
        <div className={classes.card}>
          <div className={classes.section}>
            <Typography variant="h3" component={"h2"}>
              {post?.title}
            </Typography>
            <Typography
              gutterBottom
              variant="h6"
              color="textSecondary"
              component={"h2"}
            >
              {post?.tags.map((tag) => "#" + tag + " ")}
            </Typography>
            <Typography gutterBottom variant="body1" component={"p"}>
              {post?.message}
            </Typography>
            <Typography variant="h6">Created by: {post?.name}</Typography>
            <Typography variant="body1">
              {moment(post?.createdAt, "DD.MM.YYYY hh:mm:ss").fromNow()}
            </Typography>
            <Divider style={{ margin: "20px 0" }} />
            <Typography variant="body1">
              <strong>Realtime chat - coming soon!</strong>
            </Typography>
            <Divider style={{ margin: "20px 0" }} />
            <CommentSection post={post} />
            <Divider style={{ margin: "20px 0" }} />
          </div>
          <div className={classes.imageSection}>
            <img
              src={
                post?.selectedFile ||
                "https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png"
              }
              alt={post?.title}
              className={classes.media}
            />
          </div>
        </div>
        {recommendedPosts.length > 0 && (
          <div className={classes.section}>
            <Typography gutterBottom variant="h5">
              You might also like
            </Typography>
            <Divider />
            <div className={classes.recommendedPosts}>
              {recommendedPosts.map(
                ({
                  _id,
                  title,
                  message,
                  name,
                  tags,
                  selectedFile,
                  likes,
                  createdAt,
                }) => (
                  <Card
                    style={{ margin: "20px", cursor: "pointer" }}
                    onClick={() => openPost(_id)}
                    className={classes.recommendedPost}
                    elevation={6}
                    key={_id}
                  >
                    <div className={classes.recommendedPostImage}>
                      <img
                        src={selectedFile}
                        alt={title}
                        width="100%"
                        height={"100%"}
                        style={{ backgroundAttachment: "fixed" }}
                      />
                      <div className={classes.overlay}></div>
                    </div>
                    <div className={classes.recommendedPostDetail}>
                      <Typography gutterBottom variant="h6">
                        {title}
                      </Typography>
                      <Typography gutterBottom variant="subtitle2">
                        <span style={{ fontWeight: "bold" }}>{name}</span>
                        <span
                          style={{
                            marginLeft: "60px",
                            color: "blanchedalmond",
                          }}
                        >
                          {moment(createdAt, "DD.MM.YYYY hh:mm:ss a").fromNow()}
                        </span>
                      </Typography>
                      <Divider
                        style={{ backgroundColor: "white", margin: "10px 0" }}
                      />
                      <Typography gutterBottom variant="subtitle2">
                        {message}
                      </Typography>
                      <Typography gutterBottom variant="subtitle1">
                        Likes {likes.length}
                      </Typography>
                    </div>
                  </Card>
                )
              )}
            </div>
          </div>
        )}
      </Paper>
    </React.Fragment>
  );
}

export default PostDetails;
