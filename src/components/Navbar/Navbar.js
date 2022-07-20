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
import memories from "../../images/memories.jpg";
import { Toolbar } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { LOGOUT } from "../../constants/actionTypes";

function Navbar() {
  const classes = useStyles();
  const media = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const logout = () => {
    localStorage.removeItem("user");
    dispatch({
      type: LOGOUT,
    });
  };

  useEffect(() => {}, [media, user]);

  return (
    <AppBar position="static" className={classes.AppBar} color="inherit">
      <div className={classes.brandContainer}>
        <Link to={"/"} style={{ textDecoration: "none" }}>
          <Typography
            variant={media ? "h4" : "h2"}
            align="center"
            className={classes.heading}
          >
            Memories
          </Typography>
        </Link>
        <img
          src={memories}
          height="60px"
          className={classes.image}
          alt="memories"
        />
      </div>
      <Toolbar className={classes.toolbar}>
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
