/*global google */
import React, { useState, useEffect, useRef, useCallback } from 'react';
import config from '../../../../../config.js';
import { GoogleMap, useLoadScript, Marker, InfoWindow, ScriptLoaded } from '@react-google-maps/api';
import InfoWindowItem from './InfoWindowItem.jsx';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Button, Slide } from '@material-ui/core';
import Drawer from  '../../Drawer.jsx';


const useStyles = makeStyles({
  outer: {
    display: 'flex',
    justifyContent: 'center',
  },
  head: {
    width: 700,
    marginBottom: '10%',
  },
  instruction: {
    fontSize: 75,
    fontWeight: 300,
  },
});

const containerStyle = {
  width: '70%',
  height: '70%',
  margin: 0,
  padding: 0,
};

const centerSample = [{
  lat: 37.773972,
  lng: -122.431297
}];


const sampleCoords = [
  {
    coordinates: {
      lat: 37.795429,
      lng: -122.393561
    }
  },
  {
    coordinates: {
    lat: 37.759773,
    lng: -122.427063
    }
  },
  {
    coordinates: {
    lat: 37.781372,
    lng: -122.394241
    }
  },
  {
    coordinates: {
    lat: 37.769722,
    lng: -122.476944
    }
  },
  {
    coordinates: {
    lat: 37.769722,
    lng: -122.476944
    }
  },
]

function DropOffMap(props) {
  const classes = useStyles();

  const {isLoaded, loadError} = useLoadScript({
    googleMapsApiKey: config.token
  });

  const [selected, setSelected] = useState({});
  const [markers, setMarkers] = useState([]);
  const [openWindow, setOpenWindow] = useState(false);
  const [isClaimed, setStatus] = useState(false);


  useEffect(() => {
    setMarkers(sampleCoords);
  }, []);


 const onSelect = (item) => {
  setSelected(item);
  setOpenWindow(true);
};


  const renderMap = () => {

    return (
      <React.Fragment>
      <div>
        <div className={classes.outer}>
          <div className={classes.head}>
            <Typography className={classes.instruction}>
              Find Drop Off Locations</Typography>
          </div>
        </div>
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={{
            lat: 37.773972,
            lng: -122.431297
          }}
          // center={props.center}
          zoom={12}
        >

          {markers.map((marker, i) => (
            <Marker
              key={i}
              position={{lat: marker.coordinates.lat, lng: marker.coordinates.lng}}
              onClick={() => onSelect(marker)}
              animation={window.google.maps.Animation.DROP}
            />
          ))};

        {openWindow &&
        (
          <InfoWindow
            position={selected.coordinates}
            clickable={true}
            onCloseClick={() => setOpenWindow(false)}
          >
            <>
            <InfoWindowItem
              coordinates={selected.coordinates}
            />
            </>
          </InfoWindow>
        )}
        </GoogleMap>
      </div>
      </React.Fragment>

    )
  };

  if (loadError) {
    return <div>Error loading Map</div>
  };

  return isLoaded ? renderMap() : <div>noooo</div>

};

export default DropOffMap;
