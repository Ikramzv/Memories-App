import React, { useEffect } from "react";
import {
  AppBar,
  Avatar,
  Button,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { Link } from "react-router-dom";
import useStyles from "./styles";
import memories from "../../images/memories.png";
import { Toolbar, useTheme } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { logOut } from "../../actions/user";

function Navbar() {
  const classes = useStyles();
  const theme = useTheme();
  const media = useMediaQuery(theme.breakpoints.down("sm"));
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const logout = () => {
    localStorage.removeItem("user");
    dispatch(logOut());
  };

  useEffect(() => {}, [media, user]);

  return (
    <AppBar position="static" className={classes.AppBar} color="inherit">
      <div
        className={classes.brandContainer}
        style={{ justifyContent: `${media ? "center" : "start"} ` }}
      >
        <Link
          to={"/"}
          style={{
            textDecoration: "none",
            display: "flex",
            alignItems: "center",
          }}
        >
          <Typography
            variant={media ? "h4" : "h2"}
            align="center"
            className={classes.heading}
            style={{ transition: "500ms" }}
          >
            Memories
          </Typography>
          <img
            src={memories}
            height={`${media ? "30px" : "40px"}`}
            className={classes.image}
            alt="memories"
          />
        </Link>
      </div>
      <Toolbar
        className={classes.toolbar}
        style={{
          alignItems: "center",
          justifyContent: "center",
          width: `${media ? "100%" : "400px"}`,
        }}
      >
        {user ? (
          <div className={classes.profile}>
            <Avatar
              className={classes.purple}
              alt={user?.name}
              src={user?.result?.imageUrl}
            >
              {user?.name.charAt(0)}
            </Avatar>
            <Typography className={classes.username}>{user?.name}</Typography>
            <Button
              variant="contained"
              color="error"
              className={classes.logout}
              onClick={logout}
            >
              Log out
            </Button>
          </div>
        ) : (
          <Link to={"/auth"} style={{ textDecoration: "none" }}>
            <Button variant="contained" color="primary">
              Sign in
            </Button>
          </Link>
        )}
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
