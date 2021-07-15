import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Button, Slide } from '@material-ui/core';
import axios from 'axios';

import Drawer from '../Drawer.jsx';
import ChooseRole from './ChooseRole.jsx';
import Login from './Login.jsx';
import MainGoogleMap from '../map/MainGoogleMap.jsx';
import MainGoogleMap2 from '../map/MainGoogleMap2.jsx';

const useStyles = makeStyles({
  outer: {
    position: 'absolute',
    top: '20%',
    left: '30%',
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  title: {
    fontSize: 90,
    fontWeight: 300,
    marginBottom: '30%',
  },
  button: {
    height: 100,
    width: '125%',
    borderRadius: 50,
    boxShadow: '0 5px 10px 5px rgba(128,128,128, .3)',
    fontSize: 30,
    margin: '15%',
  }
});

const Welcome = () => {
  const classes = useStyles();
  const [view, setView] = useState(false);
  const [isCaregiver, setRole] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [dogName, setDogName] = useState('');
  const [dogType, setDogType] = useState('small');
  const [card, setCard] = useState('');
  const [expMonth, setExpMonth] = useState('');
  const [expYear, setExpYear] = useState('');
  const [cvv, setCvv] = useState('');
  const [zip, setZip] = useState('');

  useEffect(() => {
    if (zip !== '') {
        sendUserInfo();
    }
  }, [zip]);

  const sendUserInfo = () => {
    const data = {
      is_caregiver: true,
      email: email,
      pw: password,
      dog_name: dogName,
      dog_type: dogType,
      card_num: card,
      exp_month: expMonth,
      exp_year: expYear,
      cvv: cvv,
      zip_code: zip
    };
    console.log(isCaregiver);
    // axios.post('/signup', data)
    //   .then((res) => {
    //     console.log('successfully posted')
    //   })
    //   .catach((err) => {
    //     console.log(err);
    //   })
    if (isCaregiver) {
      setView('caregiver');
    } else {
      setView('remover');
    }
  }

  const inputUserInfo = (view, email, password) => {
    setRole(view === 'caregiver' ? true : false);
    setEmail(email);
    setPassword(password);
  }

  const inputDogInfo = (dogName, dogType) => {
    setDogName(dogName);
    setDogType(dogType);
  }

  const inputPaymentInfo = (card, expMonth, expYear, cvv, zip) => {
    setCard(card);
    setExpMonth(expMonth);
    setExpYear(expYear);
    setCvv(cvv);
    setZip(zip);
  }

  if (!view) {
    return (
      <div className={classes.outer}>
        <div className={classes.container}>
          <Typography className={classes.title}>Welcome!</Typography>
          <Button
            variant="contained"
            color="primary"
            className={classes.button}
            onClick={() => setView('login')}>
            Log in
          </Button>
          <Button
            variant="contained"
            color="primary"
            className={classes.button}
            onClick={() => setView('signup')}>
            Sign up
          </Button>
        </div>
      </div>
    )
  } else if (view === 'signup') {
    return (
      <Slide direction="up" in={true}>
        <div>
          <ChooseRole
            sendUserInfo={sendUserInfo}
            inputUserInfo={inputUserInfo}
            inputDogInfo={inputDogInfo}
            inputPaymentInfo={inputPaymentInfo}/>
        </div>
      </Slide>
    )
  } else if (view === 'login') {
    return (
      <Slide direction="up" in={true}>
        <div>
          <Login/>
        </div>
      </Slide>)
  } else if (view === 'caregiver') {
    return (
      <Slide direction="up" in={true}>
        <div>
          <Drawer/>
          <MainGoogleMap role={view}/>
        </div>
      </Slide>)
  } else if (view === 'remover') {
    return (
      <Slide direction="up" in={true}>
        <div>
          <Drawer/>
          <MainGoogleMap2/>
        </div>
      </Slide>
    )
  }
};

export default Welcome;