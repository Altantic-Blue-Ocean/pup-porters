/*global google */
import React, { useState, useEffect, useRef, useCallback } from 'react';
import config from '../../../../../config.js';
import { GoogleMap, ScriptLoaded, useLoadScript, Marker, InfoWindow } from '@react-google-maps/api';
import InfoWindowItem from './InfoWindowItem.jsx';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Button, Slide } from '@material-ui/core';

const useStyles = makeStyles({
  outer: {
    display: 'flex',
    justifyContent: 'center',
  },
  head: {
    width: 700,
    marginBottom: '10%',
    textAlign: 'center',
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
  },
  buttons: {
    margin: 50,
    marginLeft: '-25%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  }
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

// let icon = {
//   url: 'http://localhost:300/poop.png',
//   scaledSize: new google.maps.Size(50, 50),
// };

const sampleCoords = [
  {
    coordinates: {
      lat: 37.795429,
      lng: -122.393561
    },
    icon: {url: 'http://localhost:3000/poop.png'}
  },
  {
    coordinates: {
    lat: 37.759773,
    lng: -122.427063
    },
    icon: {url: 'http://localhost:3000/poop.png'}
  },
  {
    coordinates: {
    lat: 37.781372,
    lng: -122.394241
    },
    icon: {url: 'http://localhost:3000/poop.png'}
  },
  {
    coordinates: {
    lat: 37.769722,
    lng: -122.476944
    },
    icon: {url: 'http://localhost:3000/poop.png'}
  },
  {
    coordinates: {
    lat: 37.769722,
    lng: -122.476944
    },
    icon: {url: 'http://localhost:3000/poop.png'}
  },
];

function RemoverMap(props) {
  const classes = useStyles();

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

  markers.filter((marker) => {
    if (marker.coordinates.lat === item.coordinates.lat) {
      item.icon = {
        url: 'http://localhost:3000/poopblue.png',
        scaledSize: new google.maps.Size(50, 50),
      }
    }
  })
};

const handleRemoveMarker = (coords) => {
  let newList = markers.filter((mark) => {
    return mark.coordinates.lat !== coords.coordinates.lat;
  });
  setMarkers(newList);
  setSelected({})
};

const sendTransaction = () => {
  console.log(selected)
  // axios.post('/transaction', selected)
  //   .then((res) => {
  //     console.log(res);
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //   })
};


// console.log('markers')
// console.log(markers)

// console.log('SELECTED COORDINATES HERE:')
// console.log(selected.coordinates)

  const renderMap = () => {
    // let icon = {
    //   url: 'http://localhost:300/poop.png',
    //   scaledSize: new google.maps.Size(50, 50),
    // };

    return (
      <div>
        <div className={classes.outer}>
          <div className={classes.head}>
            <Typography className={classes.instruction}>
              Select Pup Pile &trade;</Typography>
          </div>
        </div>
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={props.centerLocation}
          // center={props.center}
          zoom={12}
        >

          {markers.map((marker, i) => (
            <Marker
              key={i}
              position={{lat: marker.coordinates.lat, lng: marker.coordinates.lng}}
              onClick={() => onSelect(marker)}
              icon={{
                url: marker.icon.url,
                scaledSize: new google.maps.Size(50, 50),
              }}
              animation={window.google.maps.Animation.DROP}
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
        {!isClaimed ?
          (<Button
            variant="contained"
            color="primary"
            className={classes.button}
            onClick={() => {
              sendTransaction();
              setStatus(true);
            }}>
            Own
          </Button>) : (
          <Button
            variant="contained"
            color="primary"
            className={classes.button}
            onClick={() => sendTransaction()}>
            Complete
          </Button>
          )
        }
        <button onClick={() => {handleRemoveMarker(selected)}}>remove</button>
        </div>
      </div>
    )
  }

  return props.googleApiLoaded ? renderMap() : <div>noooo</div>

};

export default RemoverMap;
