/*global google */
import React, { useState, useEffect } from 'react';
import CaregiverMap from './caregiverMap/CaregiverMap.jsx';
import RemoverMap from './removerMap/RemoverMap.jsx';
import DropOffMap from './dropoffMap/DropOffMap.jsx';
import Drawer from  '../Drawer.jsx';

const MainGoogleMap2 = () => {

  return (
    <div className="App" style={{ width: '200%', marginLeft: '5%'}}>
      <br /><br />
      <Drawer />
      {/* <CaregiverMap/> */}
      <RemoverMap/>
      {/* <DropOffMap/> */}
    </div>
  );
};

export default MainGoogleMap2;
