/*global google */
import React, { useState, useEffect } from 'react';
import CaregiverMap from './caregiverMap/CaregiverMap.jsx';
import RemoverMap from './removerMap/RemoverMap.jsx';
import DropOffMap from './dropoffMap/DropOffMap.jsx';

const MainGoogleMap = (props) => {
  console.log('role', props.role)
  if (props.role === 'caregiver') {
    return (
      <div className="App" style={{ width: '200%', marginLeft: 50}}>
        <br /><br />
        <CaregiverMap/>
        {/* <RemoverMap/> */}
        {/* <DropOffMap/> */}
      </div>
    );
  } else if (props.role === 'remover'){
    return (
      <div className="App" style={{ width: '200%', marginLeft: 50}}>
        <br /><br />
        {/* <CaregiverMap/> */}
        <RemoverMap/>
        {/* <DropOffMap/> */}
      </div>
    );
  }

};

export default MainGoogleMap;
