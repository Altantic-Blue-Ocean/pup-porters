// import React, { useState } from 'react';
// import { makeStyles } from '@material-ui/core/styles';
// import { Button, TextField, Slide } from '@material-ui/core';

// import Welcome from './Welcome.jsx';

// const useStyles = makeStyles({
//   outer: {
//     position: 'relative',
//     top: 300,
//   },
//   container: {
//     display: 'flex',
//     flexDirection: 'column',
//     alignItems: 'center',
//   },
//   title: {
//     fontSize: 90,
//     marginRight: 200,
//     marginLeft: 200,
//     marginBottom: 250,
//   },
//   form: {
//     display: 'flex',
//     flexDirection: 'column',
//     alignItems: 'center',
//   },
//   input: {
//     width: 500,
//     height: 200,
//   },
//   button: {
//     height: 100,
//     width: 500,
//     borderRadius: 40,
//     boxShadow: '0 5px 10px 5px rgba(128,128,128, .3)',
//     fontSize: 30,
//     margin: 50,
//   }
// });

// const Login = () => {
//   const classes = useStyles();
//   const [view, changeView] = useState(false);

//   if (!view) {
//     return (
//       <div className={classes.outer}>
//         <div className={classes.container}>
//           <form  className={classes.form} required autoComplete="off">
//             <TextField
//               className={classes.input}
//               label="Email Address"
//               type="email"
//               ref={emailRef}
//               inputProps={{style: {fontSize: 40}}}
//               InputLabelProps={{style: {fontSize: 40}}}/>
//             <TextField
//               className={classes.input}
//               label="Password"
//               type="password"
//               ref={passwordRef}
//               inputProps={{style: {fontSize: 40}}}
//               InputLabelProps={{style: {fontSize: 40}}}/>
//           </form>
//           <Button
//             variant="contained"
//             color="primary"
//             className={classes.button}>
//             Log in
//           </Button>
//           <Button
//             variant="contained"
//             className={classes.button}
//             onClick={() => changeView('back')}>
//             Back
//           </Button>
//         </div>
//       </div>
//     )
//   } else {
//     return (
//       <Slide direction="down" in={true}>
//         <div>
//           <Welcome/>
//         </div>
//       </Slide>
//     )
//   }
// }

// export default Login;

import React, { useRef, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Button, TextField, Slide } from '@material-ui/core';
import DogType from './DogType.jsx';
import PaymentInfo from './PaymentInfo.jsx';
import ChooseRole from './ChooseRole.jsx';
import { useAuth } from '../../contexts/AuthContext';
import { Link, useHistory } from "react-router-dom";

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

const Login = (props) => {
  const classes = useStyles();
  const emailRef = useRef();
  const passwordRef = useRef();
  const { login } = useAuth();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  async function handleSubmit(e) {
    e.preventDefault()

    try {
      setError("")
      setLoading(true)
      await login(emailRef.current.value, passwordRef.current.value)
      history.push("/")
    } catch {
      setError("Failed to log in")
    }

    setLoading(false)
  }

  return (
    <div className={classes.outer}>
      <div className={classes.container}>
        <Typography className={classes.title}>
          Login</Typography>
        <form className={classes.form} required autoComplete="off">
          <TextField
            className={classes.input}
            label="Email Address"
            id="email"
            type="email"
            inputRef={emailRef}
            inputProps={{ style: { fontSize: 40 } }}
            InputLabelProps={{ style: { fontSize: 40 } }}
             />
          <TextField
          
            className={classes.input}
            label="Password"
            id="password"
            type="password"
            inputRef={passwordRef}
            inputProps={{ style: { fontSize: 40 } }}
            InputLabelProps={{ style: { fontSize: 40 } }}
          />
        </form>
        <Button
          onClick={handleSubmit}
          type="submit"
          disabled={loading}
          variant="contained"
          color="primary"
          className={classes.button}
        >
          Login
        </Button>
        <Button
          onClick={()=>history.go(-1)}
          variant="contained"
          className={classes.button}
        >
          Back
        </Button>
        <div>
          Need an account? <Link to="/personalinfo">Sign Up</Link>
        </div>
      </div>
    </div>
  );
}


export default Login;