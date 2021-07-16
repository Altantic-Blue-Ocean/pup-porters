import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';

const useStyles = makeStyles({
  modal: {
    position: 'absolute',
    marginTop: 1000,
    margin: 350,
    width: '50%',
    height: '10%',
    backgroundColor: 'white',
    borderRadius: 50,
    borderColor: '2565A0',
    border: '10px solid',
  },
  text: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 50,
    fontSize: 65,
    fontWeight: 300,
  },
  poop: {
    width: 150,
    height: 150,
  }
})

const Confirmation = () => {
  const classes = useStyles();
  return (
    <div className={classes.modal}>
      <Typography color="primary" className={classes.text}>
        Good Shit!
        <img src='/poop.png' className={classes.poop}></img>
      </Typography>
    </div>
  )
}

export default Confirmation;