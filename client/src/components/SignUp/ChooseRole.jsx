import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Typography } from '@material-ui/core';
import { Link, useHistory } from 'react-router-dom'

const useStyles = makeStyles({
  outer: {
    position: 'relative',
    top: 300,
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  title: {
    fontSize: 80,
    fontWeight: 300,
    marginBottom: '30%',
    paddingLeft: '25%',
    paddingRight: '15%',
  },
  button: {
    height: 100,
    width: 500,
    // borderRadius: 50,
    boxShadow: '0 5px 10px 5px rgba(128,128,128, .3)',
    fontSize: 30,
    margin: 30,
  }
});

const ChooseRole = (props) => {
  const classes = useStyles();
  const history = useHistory();

  const handleClick = () => {
    history.push('/personalinfo');
  }

    return (
      <div className={classes.outer}>
        <div className={classes.container}>
          <Typography className={classes.title}>
            Are you a caregiver or a remover?</Typography>
          <Button
          onClick={handleClick}
            variant="contained"
            color="primary"
            className={classes.button}
            >
            Caregiver
          </Button>
          <Button
          onClick={handleClick}
            variant="contained"
            color="primary"
            className={classes.button}
            >
            Remover
          </Button>
          <Button
            variant="contained"
            className={classes.button}
            onClick={()=>history.go(-1)}>
            Back
          </Button>
        </div>
      </div>
    )
  }

export default ChooseRole;