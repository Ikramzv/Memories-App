import { deepOrange, deepPurple } from "@material-ui/core/colors";
import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  containerCard: {
    position: "relative",
  },
  media: {
    paddingTop: "56.25%",
    backgroundColor: "rgba(0,0,0,0.5)",
    backgroundBlendMode: "darken",
  },
  border: {
    border: "solid",
  },
  fullHeightCard: {
    height: "100%",
  },
  card: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    borderRadius: "15px !important",
    height: "400px",
    overflowY: "auto !important",
    position: "relative",
    padding: "0 0 40px 0",
  },
  overlay: {
    position: "absolute",
    top: "20px",
    left: "20px",
    color: "white",
  },
  overlay2: {
    position: "absolute",
    top: "20px",
    right: "20px",
    color: "white",
  },
  grid: {
    display: "flex",
  },
  openPost: {
    cursor: "pointer",
    "&:hover": {
      backgroundColor: deepPurple[200],
      transitionDuration: theme.transitions.duration.standard,
    },
  },
  details: {
    display: "flex",
    justifyContent: "space-between",
    margin: "20px",
  },
  title: {
    padding: "0 16px",
  },
  cardActions: {
    padding: "2px 16px 5px 16px !important",
    position: "absolute",
    bottom: 0,
    left: 0,
    display: "flex",
    width: "100%",
    justifyContent: "space-between",
    backgroundColor: "#fff",
  },
}));
