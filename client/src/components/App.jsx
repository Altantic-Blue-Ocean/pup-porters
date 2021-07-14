import React, { useState } from 'react';
import MainGoogleMap from '../components/map/MainGoogleMap.jsx';
import ReactDOM from "react-dom";
import {
  HashRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Button, Slide } from '@material-ui/core';

import UserProfile from './Profile_UpdatePayment/userProfile.jsx';
import DogType from './signup/DogType.jsx';
import Welcome from './signup/Welcome.jsx';
// import GoogleMap from '../components/map/MainGoogleMap.jsx';
import { AuthProvider } from '../contexts/AuthContext'

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
  petMe: {
    fontSize: 70,
    color: 'white',
    fontWeight: 300,
    marginTop: '10%'
  }
});

const App = (props) => {
  const classes = useStyles();
  const [view, setView] = useState(false);

  if (!view) {
    return (
      <div style={{width: '100%', height: '100%', backgroundColor: '#2565A0'}}>
      <div className={classes.outer}>
        <div className={classes.container}>
          <Typography className={classes.title}>Pup Porters</Typography>
          <img src='/dog.png'
            className={classes.dog}
            onClick={() => setView(true) }></img>
          <Typography className={classes.petMe}>Pet Me!</Typography>
        </div>
      </div>
      </div>
    )
  } else {
    return (
      <Slide direction="up" in={true}>
        <div>
          <Welcome/>
        </div>
      </Slide>
    )
  }
};

export default App;

    {/* <Welcome/> */}
    {/* <MainGoogleMap/> */}
    // </div>
    {/* </div> */}
    {/* // </AuthProvider> */}