import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, TextField, Button, Slide } from '@material-ui/core';
import { Link, useHistory } from "react-router-dom";
import axios from 'axios';

import DogType from './DogType.jsx';

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
    marginBottom: 100,
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
  secondLine: {
    display: 'flex',
    flexDirection: 'row',
    width: '70%',
    marginTop: '10%',
  },
  radio: {
    margin: 30,
  },
  button: {
    height: 100,
    width: 500,
    borderRadius: 50,
    boxShadow: '0 5px 10px 5px rgba(128,128,128, .3)',
    fontSize: 30,
    margin: 50,
  },
  dateDivider: {
    fontSize: 30
  }
});

const PaymentInfo = (props) => {
  const classes = useStyles();
  const [view, setView] = useState(false);
  const [card, setCard] = useState('');
  const [expMonth, setExpMonth] = useState('');
  const [expYear, setExpYear] = useState('');
  const [cvv, setCvv] = useState('');
  const [zip, setZip] = useState('');

  if (!view) {
    return (
      <div className={classes.outer}>
        <div className={classes.container}>
          <Typography className={classes.title}>
              You're almost there!
          </Typography>
          <form  className={classes.form} required autoComplete="off">
            <TextField placeholder='Credit Card' value={card}
              inputProps={{style: {fontSize: 40}}}
              InputLabelProps={{style: {fontSize: 40}}}
              onChange={(e) => setCard(e.target.value)}/>
            <div className={classes.secondLine}>
            <TextField placeholder='mm' value={expMonth}
              onChange={(e) => setExpMonth(e.target.value)}
              inputProps={{style: {fontSize: 40}}}
              InputLabelProps={{style: {fontSize: 40}}}/>
            <Typography variant='body1'
              className={classes.dateDivider}>/</Typography>
            <TextField placeholder='yy' value={expYear}
              onChange={(e) => setExpYear(e.target.value)}
              inputProps={{style: {fontSize: 40}}}
              InputLabelProps={{style: {fontSize: 40}}}/>
            <TextField placeholder='CVV' value={cvv}
              onChange={(e) => setCvv(e.target.value)}
              inputProps={{style: {fontSize: 40}}}
              InputLabelProps={{style: {fontSize: 40}}}/>
            <TextField placeholder='Zip Code' vlaue={zip}
              onChange={(e) => setZip(e.target.value)}
              inputProps={{style: {fontSize: 40}}}
              InputLabelProps={{style: {fontSize: 40}}}/>
            </div>
          </form>
          <Link to="maingooglemap">
            <Button
              variant="contained"
              color="primary"
              className={classes.button}>
              Submit
            </Button>
          </Link>
          <Button
            variant="contained"
            className={classes.button}
            onClick={()=>history.go(-1)}>
            Back
          </Button>
        </div>
      </div>
    )
  } else if (view === 'back') {
    return(
      <Slide direction="down" in={true}>
        <div>
          <DogType
            sendUserInfo={props.sendUserInfo}
            inputDogInfo={props.inputDogInfo}
            inputPaymentInfo={props.inputPaymentInfo}/>
        </div>
      </Slide>
    )
  }
}

export default PaymentInfo;