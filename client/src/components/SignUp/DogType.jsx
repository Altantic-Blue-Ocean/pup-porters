import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Typography,
  TextField,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Button,
  Slide
} from '@material-ui/core';
import { Link, useRouter } from 'react-router-dom'

import PaymentInfo from './PaymentInfo.jsx';
import PersonalInfo from './PersonalInfo.jsx';

const useStyles = makeStyles({
  outer: {
    position: 'relative',
    top: 200,
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  title: {
    fontSize: 80,
    fontWeight: 300,
    marginRight: 200,
    marginLeft: 200,
    marginBottom: 100,
  },
  form: {
    width: 500,
  },
  label: {
    fontSize: 40,
    margin: 20,
  },
  checkBoxLabel: {
    fontSize: 35,
  },
  radio: {
    height: 50,
    margin: 10,
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

const DogType = (props) => {
  const classes = useStyles();
  const [view, setView] = useState(false);
  const [dogName, setDogName] = useState('');
  const [dogType, setDogType] = useState('small');

  const handleChange = (e) => {
    setDogType(e.target.value);
  }

  if (!view) {
    return (
      <div className={classes.outer}>
        <div className={classes.container}>
          <Typography className={classes.title}>
            Tell us more about your dog!</Typography>
          <form>
            <TextField
              className={classes.input}
              label="Your Dog's Name"
              inputProps={{ style: { fontSize: 40 } }}
              InputLabelProps={{ style: { fontSize: 40 } }}
              onChange={(e) => setDogName(e.target.value)} />
          </form>
          <FormControl className={classes.form} >
            <FormLabel className={classes.label}>Size of your dog</FormLabel>
            <RadioGroup
              value={dogType} onChange={handleChange}>
              <FormControlLabel
                classes={{ label: classes.checkBoxLabel }}
                label="Small (0-20lbs)"
                control={<Radio color="primary" />}
                value="small"
                className={classes.radio} />
              <FormControlLabel
                classes={{ label: classes.checkBoxLabel }}
                label="Medium (21-50lbs)"
                control={<Radio color="primary" />}
                value="medium"
                className={classes.radio} />
              <FormControlLabel
                classes={{ label: classes.checkBoxLabel }}
                label="Large (51-99lbs)"
                control={<Radio color="primary" />}
                value="large"
                className={classes.radio} />
              <FormControlLabel
                classes={{ label: classes.checkBoxLabel }}
                label="Extra Large (100+lbs)"
                control={<Radio color="primary" />}
                value="xlarge"
                className={classes.radio} />
            </RadioGroup>
          </FormControl>
          <Button
            variant="contained"
            color="primary"
            className={classes.button}
            onClick={() => {
              setView('credit-card');
              props.inputDogInfo(dogName, dogType);
            }}>
            Submit
          </Button>
          <Button
            variant="contained"
            className={classes.button}
            onClick={() => history.go(-1)}>
            Back
          </Button>
        </div>
      </div>
    )
  } else if (view === 'credit-card') {
    return (
      <Slide direction="up" in={true}>
        <div>
          <PaymentInfo
            sendUserInfo={props.sendUserInfo}
            inputPaymentInfo={props.inputPaymentInfo} />
        </div>
      </Slide>
    )
  } else if (view === 'back') {
    return (
      <Slide direction="down" in={true}>
        <div>
          <PersonalInfo
            sendUserInfo={props.sendUserInfo}
            inputUserInfo={props.inputUserInfo}
            inputDogInfo={props.inputDogInfo}
            inputPaymentInfo={props.inputPaymentInfo} />
        </div>
      </Slide>
    )
  }

}

export default DogType;