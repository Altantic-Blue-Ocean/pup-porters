import React, { useState } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import {
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemText,
  SvgIcon,
  SwipeableDrawer,
  Button,
  Typography
} from '@material-ui/core';
import { Link, useHistory } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext"
import MenuIcon from '@material-ui/icons/MenuOutlined';

const useStyles = makeStyles({
  '@global': {
    ul: {
      margin: 0,
      padding: 0,
      listStyle: 'none',
    },
  },
  // appBar: {
  //   borderBottom: `1px solid ${theme.palette.divider}`,
  // },
  largeIcon: {
    fontSize: '100px'
  },
  primaryCircle: {
    background: '#2565A0',
    borderRadius: 20
  },
  list: {
    color: 'FFFFFF',
    width: 500
  },
  fullList: {
    width: 'auto',
  },
  paper: {
    background: '#2565A0'
  },
  link: {
    position: 'relative',
    top: 100,
    left: 50,
    textDecoration: 'none',
  },
  nav: {
    fontSize: 50,
    fontWeight: 300,
    margin: 20,
    marginBottom: 50,
    color: 'white',
    textDecoration: 'none',
  },
  logout: {
    position: 'relative',
    top: 100,
    left: 50,
  }
});

export default function SwipeableTemporaryDrawer() {
  const classes = useStyles();
  const [state, setState] = useState({
    left: false,
  });
  const [error, setError] = useState("")
  const { currentUser, userInfo, logout } = useAuth()
  const history = useHistory()

  async function handleLogout() {
    setError("")

    try {
      await logout()
      history.push("/login")
    } catch {
      setError("Failed to log out")
    }
  }

  const toggleDrawer = (anchor, open) => (event) => {
    if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === 'top' || anchor === 'bottom',
      })}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <Link to="/userprofile" className={classes.link}>
        <Typography className={classes.nav}>User Profile</Typography>
      </Link>
      <Link to="/maingooglemap" className={classes.link}>
        <Typography className={classes.nav}>Pup Pile Map</Typography>
      </Link>
      {userInfo[0].is_caregiver ?
       null : <Link to={{pathname: "/maingooglemap", state: {dropoff: true}}} className={classes.link}>
       <Typography className={classes.nav}>Drop Off</Typography>
     </Link> }
      <Button onClick={handleLogout} className={classes.logout}>
        <Typography className={classes.nav}>Logout</Typography>
      </Button>
    </div>
  );

  return (
    <div>
      {['left'].map((anchor) => (
        <React.Fragment key={anchor}>

          <IconButton className={classes.primaryCircle} color="secondary" onClick={toggleDrawer(anchor, true)}>
            <MenuIcon className={classes.largeIcon} />
          </IconButton>
          <SwipeableDrawer
            classes={{ paper: classes.paper }}
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
            onOpen={toggleDrawer(anchor, true)}
          >
            {list(anchor)}
          </SwipeableDrawer>
        </React.Fragment>
      ))}
    </div>
  );
}