import React, { useState, useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Button, TextField, Slide } from '@material-ui/core';

import DogType from './DogType.jsx';
import PaymentInfo from './PaymentInfo.jsx';
import ChooseRole from './ChooseRole.jsx';
import { useAuth } from '../../contexts/AuthContext'

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
    fontSize: 90,
    fontWeight: 300,
    marginRight: 200,
    marginLeft: 200,
    marginBottom: 150,
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  input: {
    width: 500,
    height: 150,
  },
  button: {
    height: 100,
    width: 500,
    borderRadius: 50,
    boxShadow: '0 5px 10px 5px rgba(128,128,128, .3)',
    fontSize: 30,
    margin: 50,
  }
});

const PersonalInfo = (props) => {
  const classes = useStyles();
  const [view, setView] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // const emailRef = useRef();
  // const passwordRef = useRef();
  // const passwordConfirmRef = useRef();
  // const { signup } = useAuth();

  // function handleSubmit(e) {
  //   e.preventDefault();

  //   signup(emailRef.current.value, passwordRef.current.value)
  // }

  if (!view) {
    return (
      <div className={classes.outer}>
        <div className={classes.container}>
        <Typography className={classes.title}>
            Personal Information</Typography>
        <form  className={classes.form} required autoComplete="off">
          <TextField
            className={classes.input}
            label="Email Address"
            id="email"
            type="email"
            // ref={emailRef}
            inputProps={{style: {fontSize: 40}}}
            InputLabelProps={{style: {fontSize: 40}}}
            onChange={(e) => setEmail(e.target.value)}/>
          <TextField
            className={classes.input}
            label="Password"
            id="password"
            type="password"
            // ref={passwordRef}
            inputProps={{style: {fontSize: 40}}}
            InputLabelProps={{style: {fontSize: 40}}}
            onChange={(e) => setPassword(e.target.value)}/>
            <TextField
            className={classes.input}
            label="Password"
            id="password-confirm"
            type="password"
            // ref={passwordConfirmRef}
            inputProps={{style: {fontSize: 40}}}
            InputLabelProps={{style: {fontSize: 40}}}
            onChange={(e) => setPassword(e.target.value)}/>
        </form>
          <Button
            variant="contained"
            color="primary"
            className={classes.button}
            onClick={() => {
              setView('dogtype');
              props.inputUserInfo(props.role, email, password);
            }}>
            Submit
          </Button>
          <Button
            variant="contained"
            className={classes.button}
            onClick={() => setView('back')}>
            Back
          </Button>
        </div>
      </div>
    )
  } else if (view === 'dogtype' && props.role === 'caregiver') {
    return (
      <Slide direction="up" in={true}>
        <div>
          <DogType
            sendUserInfo={props.sendUserInfo}
            inputDogInfo={props.inputDogInfo}
            inputPaymentInfo={props.inputPaymentInfo}/>
        </div>
      </Slide>
    )
  } else if (view === 'dogtype' && props.role === 'remover') {
    return (
      <Slide direction="up" in={true}>
        <div>
          <PaymentInfo
            sendUserInfo={props.sendUserInfo}
            inputPaymentInfo={props.inputPaymentInfo}/>
        </div>
      </Slide>
    )
  } else if (view === 'back') {
    return(
      <Slide direction="down" in={true}>
        <div>
          <ChooseRole
            sendUserInfo={props.sendUserInfo}
            inputUserInfo={props.inputUserInfo}
            inputDogInfo={props.inputDogInfo}
            inputPaymentInfo={props.inputPaymentInfo}/>
        </div>
      </Slide>
    )
  }
}

export default PersonalInfo;