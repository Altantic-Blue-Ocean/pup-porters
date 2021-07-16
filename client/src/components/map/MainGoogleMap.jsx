/*global google */
import React, { useState, useEffect } from 'react';
import CaregiverMap from './caregiverMap/CaregiverMap.jsx';
import RemoverMap from './removerMap/RemoverMap.jsx';
import DropOffMap from './dropoffMap/DropOffMap.jsx';
import SearchBar from './SearchBar.jsx';
import config from '../../../../config.js';
import axios from 'axios';
import Drawer from '../Drawer.jsx'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  searchBar: {
    display: 'flex',
    width: '1000%',
    marginLeft: '23%',
    height: '10%',
  },
})

const loadScript = (url, callback) => {
  let script = document.createElement("script");
  script.type = "text/javascript";

  if (script.readyState) {
    script.onreadystatechange = function() {
      if (script.readyState === "loaded" || script.readyState === "complete") {
        script.onreadystatechange = null;
        callback();
      }
    };
  } else {
    script.onload = () => callback();
  }

  script.src = url;
  document.getElementsByTagName("head")[0].appendChild(script);
};

const MainGoogleMap = () => {
  const styles = useStyles();

  const [googleApiLoaded, setGoogleApiLoaded] = useState(false);
  const [centerLocation, setCenterLocation] = useState({});

  useEffect(() => {
    loadScript(`https://maps.googleapis.com/maps/api/js?key=${config.token}&libraries=places`, () => {
      setGoogleApiLoaded(true);
    });
    setCenterLocation({lat: 37.773972, lng: -122.431297});
  }, []);


  const getCenterLocation = async (place) => {
    try {
      const res = await axios.get(`/center?input=${place}`);
      setCenterLocation(res.data.longLat);

    } catch (error) {
      console.log(error);
    }
  };


  return (
    <div className="App" style={{ width: '200%', marginLeft: 50}}>
      <Drawer />
      <br /><br />
      <div className={styles.searchBar}>
        <SearchBar
          googleApiLoaded={googleApiLoaded}
          getCenterLocation={getCenterLocation}
        />
      </div>
      <CaregiverMap
        googleApiLoaded={googleApiLoaded}
        centerLocation={centerLocation}
      />
      {/* <RemoverMap
        googleApiLoaded={googleApiLoaded}
        centerLocation={centerLocation}
      /> */}
      {/* <DropOffMap
        googleApiLoaded={googleApiLoaded}
        centerLocation={centerLocation}
      /> */}
    </div>
  );
};

export default MainGoogleMap;

