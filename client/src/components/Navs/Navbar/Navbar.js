import React from 'react';
import {Link} from 'react-router-dom';
import {makeStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import Register from "../../../components/authentication/Register.js";
import Login from "../../../components/authentication/Login.js";
import Logout from "../../../components/authentication/Logout.js";
import {UserContext} from "../../../components/Store/Store";

import cssClasses from './Navbar.module.css';
import clsx from "clsx";

const useStyles = makeStyles(theme => ({
    root: {

    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
}));

export default function MenuAppBar({ addedClasses, openDrawer, menuClick, id}) {
  const classes = useStyles();
  const [auth, setAuth] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [state, dispatch] = React.useContext(UserContext);
  const open = Boolean(anchorEl);

    const handleMenu = event => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

  if (!state.active) {
    var authorizationModule = (
      <ul>
        <li>
          <Register />
        </li>
        <li>
          <Login />
        </li>
      </ul>)
  } else {
    var authorizationModule = (
      <ul>
        <li>
          <Logout />
        </li>
      </ul>)
  }

  return (
    <div className={classes.root}>
      <AppBar position="fixed"
              className={clsx(addedClasses.appBar, {
        [addedClasses.appBarShift]: openDrawer,
      })}
      color={"inherit"}>
        <Toolbar>
          {auth && (
            <IconButton
              edge="start"
              className={clsx(classes.menuButton, {
                [addedClasses.hide]: openDrawer,
              })}
              color="inherit"
              aria-label="menu"
              onClick={menuClick}
            >
              <MenuIcon />
            </IconButton>
          )}
          <Typography variant="h6" className={classes.title}>
            <Link to='/'>TeamCool</Link>
          </Typography>
          <div className={cssClasses.links}>
            <ul>
              <li>
                <Link to="/teams">My Teams</Link>
              </li>
              <li>
                <Link to={`/user/${id}`}>My Profile</Link>
              </li>
              <li>
                <Link to="/contact">Contact</Link>
              </li>
              <li>
                <Link to="/about">About</Link>
              </li>
              {authorizationModule}
            </ul>
          </div>
          {auth && (
            <div>
              <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={open}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose}>Profile</MenuItem>
                <MenuItem onClick={handleClose}>My account</MenuItem>
              </Menu>
            </div>
          )}
        </Toolbar>
      </AppBar>
      <Toolbar />
    </div>
  );
}
