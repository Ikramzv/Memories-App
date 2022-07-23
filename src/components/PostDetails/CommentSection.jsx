import React, { useEffect, useState, useRef } from "react";
import { Typography, TextField, Button } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import useStyles from "./styles";
import { commentPost } from "../../actions/posts";

function CommentSection({ post }) {
  const classes = useStyles();
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const commentsRef = useRef();
  const handleClick = () => {
    const finalComment = {
      user: user.name,
      comment,
    };
    dispatch(commentPost(finalComment, post._id));
    comments.push(finalComment);
    setComment("");

    commentsRef.current.scrollIntoView({
      behaviour: "smooth",
      block: "start",
    });
  };
  useEffect(() => {
    setComments(post?.comments);
  }, [comments, post]);
  return (
    <div>
      <div className={classes.commentsOuterContainer}>
        <div className={classes.commentsInnerContainer}>
          <Typography gutterBottom variant="h6">
            Comments
          </Typography>
          {comments &&
            comments.map((c, i) => (
              <Typography key={i} variant="subtitle1" gutterBottom>
                <b>{c.user}</b> {c.comment}
              </Typography>
            ))}
          <div ref={commentsRef}></div>
        </div>
        {user && (
          <div className={classes.commentSection}>
            <Typography gutterBottom variant="h6">
              Write a Comment
            </Typography>
            <TextField
              fullWidth
              minRows={4}
              variant="outlined"
              multiline
              label="Comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            <Button
              style={{ marginTop: "10px" }}
              fullWidth
              disabled={!comment}
              color="primary"
              variant="contained"
              onClick={handleClick}
            >
              Comment
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

export default CommentSection;
