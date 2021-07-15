import React from 'react';
import { Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import BackButton from './BackButton.jsx'

const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 100,
    color: 'white',
    fontWeight: 300,
    marginTop: '30%',
    marginBottom: '20%',
  },
  dog: {
    width: 300,
  },
  petme: {
    width: 300,
  }
});

export default function Homepage() {
  const classes = useStyles();
  const history = useHistory();

  const handleClick = () => {
    history.push('/welcome')
  }

    return (
      <div style={{width: '100%', height: '100%', backgroundColor: '#2565A0'}}>
      <div className={classes.outer}>
        <div className={classes.container}>
          <Typography className={classes.title}>Pup Porters</Typography>
          <img src='/petme.png' className={classes.petme}></img>
          <img src='/dog.png' onClick={handleClick}
            className={classes.dog}
            ></img>
        </div>
      </div>
      </div>
    )

}