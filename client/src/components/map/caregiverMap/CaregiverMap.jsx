/*global google */
import React, { useState, useEffect, useRef, useCallback } from 'react';
import config from '../../../../../config.js';
import { GoogleMap, ScriptLoaded, useLoadScript, Marker, InfoWindow, Autocomplete } from '@react-google-maps/api';
import InfoWindowItem from './InfoWindowItem.jsx';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Button, Slide, Modal } from '@material-ui/core';
import Confirmation from './Confirmation.jsx';

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
  button: {
    height: 100,
    width: 500,
    borderRadius: 50,
    boxShadow: '0 5px 10px 5px rgba(128,128,128, .3)',
    fontSize: 30,
    marginBottom: 50,
  },
  buttons: {
    margin: 50,
    marginLeft: '-25%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  hello: {
    position: 'absolute',
    width: 300,
    backgroundColor: 'white',
  }
});

const containerStyle = {
  width: '70%',
  height: '70%',
  margin: 0,
  padding: 0,
};

function CaregiverMap(props) {
  const classes = useStyles();

  const [selected, setSelected] = useState({});
  const [markers, setMarkers] = useState([]);
  const [openWindow, setOpenWindow] = useState(false);
  const [iconImage, setIconImage] = useState('');
  const [iconAnimation, setIconAnimation] = useState(null);
  const [open, setOpen] = useState(false);

  // useEffect(() => {
  //   let image = 'http://localhost:300/poop.png';
  //   // setIconImage(image);
  //   setIconAnimation(2);

  // }, [])

  const onMapClick = React.useCallback((event) => {
    let icon = {
      url: 'http://localhost:300/poop.png',
      scaledSize: new google.maps.Size(50, 50),
  };

    setMarkers(() => markers.concat([{
      coordinates: {
        lat: event.latLng.lat(),
        lng: event.latLng.lng(),
      },
      icon: icon,
    }]));
 }, [markers]);

 const onSelect = (item) => {
   console.log(item)
  setSelected(item);
  setOpenWindow(true);

};
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

const handleRemoveMarker = (coords) => {
  let newList = markers.filter((mark) => {
    return mark.coordinates.lat !== coords.coordinates.lat;
  });
  setMarkers(newList);
  setSelected({});

};

const sendFlagInfo = () => {
  console.log(markers);
  axios.post('/flag', markers)
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    })
};

  const renderMap = () => {
    return (
      <div>
        <div className={classes.outer}>
          <div className={classes.head}>
            <Typography className={classes.instruction}>
            Place pup porter flag within 2” of pup pile</Typography>
          </div>
        </div>
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={props.centerLocation}
          zoom={14}
          onClick={onMapClick}
        >
          {markers.map((marker, i) => (
            <Marker
              key={i}
              position={{lat: marker.coordinates.lat, lng: marker.coordinates.lng}}
              onClick={() => onSelect(marker)}
              icon={marker.icon}
              animation={2}
            />
          ))}

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
        <div className={classes.buttons}>
        <Button
          variant="contained"
          color="primary"
          className={classes.button}
          onClick={() => {
            console.log('sending flag info')
            // sendFlagInfo();
            handleOpen();
          }}>
          Confirm
        </Button>
        <button onClick={() => {handleRemoveMarker(selected)}}>remove</button>
        <Modal open={open} onClose={handleClose}>
          <Confirmation/>
        </Modal>
        </div>
      </div>
    )
  }

  return props.googleApiLoaded ? renderMap() : <div>noooo</div>

};

export default CaregiverMap;

