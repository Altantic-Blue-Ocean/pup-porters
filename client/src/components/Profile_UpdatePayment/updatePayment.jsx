import React, {useState, useEffect} from 'react';
import TextField from '@material-ui/core/TextField';
import Fab from '@material-ui/core/Fab';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import Drawer from  '../Drawer.jsx';
import { Link, useHistory } from 'react-router-dom'

const useStyles = makeStyles({
  container: {
    height: '55%',
    width: '70%',
    background: 'white',
    display: 'flex',
    alignSelf: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    marginTop: '15%',
    marginLeft: '15%'
  },
  title: {
    marginTop: '5%',
    marginBottom: '15%',
    textAlign: 'center',
    fontSize: 80
  },
  card: {
    display: 'flex',
    justifyContent: 'center',
    width: '70%',
    marginBottom: '10%'
  },
  inputFields: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '70%',
    marginBottom: '20%'
  },
  floatingButton: {
    marginBotton: '2%'
  },
  dateDivider: {
    fontSize: 30
  }
})

function UpdatePayment (props) {
  const [card, setCard] = useState('');
  const [expMonth, setExpMonth] = useState('');
  const [expYear, setExpYear] = useState('');
  const [cvv, setCvv] = useState('');
  const [zip, setZip] = useState('');

  const styles = useStyles();

  const paymentInformation = {
    userID: props.userID,
    cardNumber: card,
    expMonth: expMonth,
    expYear: expYear,
    cvv: cvv,
    zipCode: zip
  }

  useEffect(() => {}, [paymentInformation]);

  async function update(paymentInfo) {
    const newPayment = await paymentInfo;
    props.update();
  }

  return (
    <React.Fragment>
      <Drawer />
    <div className={styles.container}>

      <Typography variant='h4' className={styles.title}>Payment Information</Typography>
      <p className={styles.card}>
        <TextField placeholder='Credit Card' fullWidth={true} value={card} onChange={(event) => setCard(event.target.value)}/>
      </p>
      <p className={styles.inputFields}>
        <TextField placeholder='mm' margin='dense' value={expMonth} onChange={(event) => setExpMonth(event.target.value)}/>
        <Typography variant='body1' className={styles.dateDivider}>/</Typography>
        <TextField placeholder='yy' margin='dense' value={expYear} onChange={(event) => setExpYear(event.target.value)}/>
        <TextField placeholder='CVV' margin='dense' value={cvv} onChange={(event) => setCvv(event.target.value)}/>
        <TextField placeholder='Zip Code' margin='dense' vlaue={zip} onChange={(event) => setZip(event.target.value)}/>
      </p>
      <Fab variant='extended' color='primary' onClick={() => update(paymentInformation)} className={styles.floatingButton}>
        Update Payment
      </Fab>
      <Button onClick={()=>history.go(-1)}>Back</Button>
    </div>

    </React.Fragment>

  )
}

export default UpdatePayment;