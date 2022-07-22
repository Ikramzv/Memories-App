import { makeStyles } from "@material-ui/core/styles";
import { deepPurple } from "@mui/material/colors";

export default makeStyles((theme) => ({
  AppBar: {
    borderRadius: 15,
    margin: "30px 0",
    display: "flex !important",
    flexDirection: "row !important",
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column !important",
      padding: "10px 20px !important",
    },
    justifyContent: "space-between !important",
    alignItems: "center",
    padding: "10px 50px !important",
  },
  brandContainer: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "start",
  },
  heading: {
    color: "rgba(0,23,255,.7)",
    textDecoration: "none !important",
    fontWeight: "500 !important",
    fontFamily: "Edu VIC WA NT Beginner , cursive !important",
    "&:hover": {
      color: deepPurple[500],
    },
  },
  image: {
    marginLeft: "15px",
  },
  toolbar: {
    display: "flex !important",
  },
  profile: {
    display: "flex",
    justifyContent: "space-between",
    width: "400px",
  },
  username: {
    display: "flex",
    alignItems: "center",
  },
  purple: {
    color: theme.palette.getContrastText(deepPurple[500]),
    backgroundColor: deepPurple[500],
  },
  logout: {
    [theme.breakpoints.down("sm")]: {
      padding: "3px 5px !important",
      height: "40px !important",
      fontSize: "9px !important",
    },
  },
}));
