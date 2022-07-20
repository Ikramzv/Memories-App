import { makeStyles } from "@material-ui/core/styles";
import { deepPurple } from "@mui/material/colors";

export default makeStyles((theme) => ({
  AppBar: {
    borderRadius: 15,
    margin: "30px 0",
    display: "flex",
    flexDirection: "row !important",
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
    color: "rgba(0,183,255,1)",
    textDecoration: "none",
  },
  image: {
    marginLeft: "15px",
  },
  toolbar: {
    display: "flex !important",
    justifyContent: "flex-end",
    width: "400px",
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
}));
