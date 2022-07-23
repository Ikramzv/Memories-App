import { makeStyles } from "@material-ui/core";

export default makeStyles((theme) => ({
  media: {
    borderRadius: "20px",
    objectFit: "cover",
    width: "100%",
    maxHeight: "600px",
  },
  card: {
    display: "flex",
    width: "100%",
    [theme.breakpoints.down("sm")]: {
      flexWrap: "wrap",
      flexDirection: "column",
    },
  },
  section: {
    borderRadius: "20px",
    margin: "10px",
    flex: 1,
  },
  imageSection: {
    marginLeft: "20px",
    [theme.breakpoints.down("sm")]: {
      marginInline: "auto",
      width: "95%",
      marginBottom: "20px",
    },
  },
  recommendedPosts: {
    display: "flex",
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
    },
  },
  recommendedPost: {
    flexBasis: "40%",
    borderRadius: "20px",
    position: "relative",
    overflow: "hidden",
    transition: "300ms all",
    "&:active": {
      transform: "scale(0.8)",
    },
  },
  recommendedPostDetail: {
    padding: theme.spacing(1, 2),
    position: "absolute",
    inset: "0 0 0 0",
    zIndex: "100",
    overflowY: "auto",
    color: "white",
    "&::-webkit-scrollbar": {
      display: "none",
    },
  },
  recommendedPostImage: {
    position: "relative",
    width: "100%",
    height: "100%",
  },
  overlay: {
    position: "absolute",
    inset: "0 0 -50px 0",
    background: "rgba(0,0,0,.6)",
    zIndex: 100,
  },
  commentsOuterContainer: {
    display: "flex",
    justifyContent: "space-between",
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column-reverse !important",
    },
  },
  commentsInnerContainer: {
    height: "200px",
    overflowY: "auto",
    marginRight: "30px",
  },
  commentSection: {
    width: "70%",
    [theme.breakpoints.down("sm")]: {
      width: "100%",
    },
  },
}));
