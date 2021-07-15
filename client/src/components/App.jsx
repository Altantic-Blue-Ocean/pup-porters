import React, { useState } from 'react';
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
import ChooseRole from './signup/ChooseRole.jsx';
import Dashboard from './Dashboard.jsx'

import Login from './signup/Login.jsx';
import PaymentInfo from './signup/PaymentInfo.jsx';
import PersonalInfo from './signup/PersonalInfo.jsx';
import PrivateRoute from './PrivateRoute.jsx';
import updatePayment from './Profile_UpdatePayment/updatePayment.jsx';
import userProfile from './Profile_UpdatePayment/userProfile.jsx';
import { AuthProvider } from '../contexts/AuthContext'
import MainGoogleMap from './map/MainGoogleMap.jsx';
import MainGoogleMap2 from './map/MainGoogleMap2.jsx';
import DropOffMap from './map/dropoffMap/DropOffMap.jsx';

const App = (props) => {
  return (
    <div>
      <Router>
        <AuthProvider>
          <Switch>
          <PrivateRoute exact path="/" component={Dashboard} />
            <Route path="/welcome" component={Welcome} />
            <Route path="/login" component={Login} />
            <Route path="/personalinfo" component={PersonalInfo} />
            <Route path="/chooserole" component={ChooseRole} />
            <Route path="/dogtype" component={DogType} />
            <Route path="/paymentinfo" component={PaymentInfo} />
            <Route path="/updatepayment" component={updatePayment} />
            <Route path="/userprofile" component={userProfile} />
            <Route path="/maingooglemap" component={MainGoogleMap} />
            <Route path="/maingooglemap2" component={MainGoogleMap2} />
            <Route path="/dropoffmap" component={DropOffMap} />
          </Switch>
        </AuthProvider>
      </Router>
    </div>
  )
}

export default App;
