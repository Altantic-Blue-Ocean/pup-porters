import React, { useState, useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Button, TextField, Slide } from '@material-ui/core';
import DogType from './DogType.jsx';
import PaymentInfo from './PaymentInfo.jsx';
import ChooseRole from './ChooseRole.jsx';
import { useAuth } from '../../contexts/AuthContext'
import { Link, useHistory } from "react-router-dom"

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
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const { signup } = useAuth();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false)
  const history = useHistory()

  // async function handleSubmit(e) {
  //   console.log('clicked')
  //   e.preventDefault()


  //   if (passwordRef.current.value !== passwordConfirmRef.current.value) {
  //     return setError("Passwords do not match")
  //   }
  //   try {
  //     setError("")
  //     setLoading(true)
  //     await signup(emailRef.current.value, passwordRef.current.value)
  //     history.push("/")
  //   } catch {
  //     setError("Failed to create an account")
  //   }

  //   setLoading(false)
  // }
async function handleSubmit() {
      console.log('clicked')

      if (passwordRef.current.value !== passwordConfirmRef.current.value) {
        return setError("Passwords do not match")
      }
      try {
        setError("")
        setLoading(true)
        await signup(emailRef.current.value, passwordRef.current.value)
        history.push("/dogtype")
      } catch {
        setError("Failed to create an account")
      }

      setLoading(false)
    }

    return (
      <div className={classes.outer}>
        <div className={classes.container}>
        <Typography className={classes.title}>
            Sign Up</Typography>
        <form  className={classes.form} required autoComplete="off">
          <TextField
            className={classes.input}
            label="Email Address"
            id="email"
            type="email"
            inputRef={emailRef}
            inputProps={{style: {fontSize: 40}}}
            InputLabelProps={{style: {fontSize: 40}}}
            />
          <TextField
            className={classes.input}
            label="Password"
            id="password"
            type="password"
            inputRef={passwordRef}
            inputProps={{style: {fontSize: 40}}}
            InputLabelProps={{style: {fontSize: 40}}}
            />
            <TextField
            className={classes.input}
            label="Confirm Password"
            id="password-confirm"
            type="password"
            inputRef={passwordConfirmRef}
            inputProps={{style: {fontSize: 40}}}
            InputLabelProps={{style: {fontSize: 40}}}
            />
        </form>
          <Button
            onClick={handleSubmit}

            disabled={loading}
            variant="contained"
            color="primary"
            className={classes.button}
            >
            Submit
          </Button>
          <Button
            onClick={()=>history.go(-1)}
            variant="contained"
            className={classes.button}
            >
            Back
          </Button>
          <div>
            Already have an account? <Link to="/login">Log In</Link>
          </div>
        </div>
      </div>
    );
  }

export default PersonalInfo;