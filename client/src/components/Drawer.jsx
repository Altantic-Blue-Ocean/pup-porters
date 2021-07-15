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
  Typography
} from '@material-ui/core';
import { Link, useHistory } from "react-router-dom";
import MenuIcon from '@material-ui/icons/MenuOutlined';

const useStyles = makeStyles((theme) => ({
  '@global': {
    ul: {
      margin: 0,
      padding: 0,
      listStyle: 'none',
    },
  },
  appBar: {
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  largeIcon: {
    fontSize: '2em'
  },
  primaryCircle: {
    background: '#2565A0',

  },
  list: {
    color: 'FFFFFF',
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
  paper: {
    background: '#2565A0'
  },

}));

export default function SwipeableTemporaryDrawer() {
  const classes = useStyles();
  const [state, setState] = useState({
    left: false,
  });

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
      {/*
        {['User Profile', 'Pup Pile Map', 'Drop Off'].map((text, index) => (
          <ListItem button key={text}>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      className={clsx(classes.list, {
        [classes.fullList]: anchor === 'top' || anchor === 'bottom',
      })}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      {/*
        {['User Profile', 'Pup Pile Map', 'Drop Off'].map((text, index) => (
          <ListItem button key={text}>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List> */}

      <Typography component={Link} to="/userprofile">
        User Profile
      </Typography>
      <Typography >
        Pup Pile Map
      </Typography>
      <Typography>
        Drop Off
      </Typography>

      <Divider />
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