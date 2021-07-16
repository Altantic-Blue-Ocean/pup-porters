/*global google */
import React, { useState, useEffect, useRef, useCallback } from 'react';
import config from '../../../../../config.js';
import { GoogleMap, useLoadScript, Marker, InfoWindow, ScriptLoaded } from '@react-google-maps/api';
import InfoWindowItem from './InfoWindowItem.jsx';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Button, Slide } from '@material-ui/core';

const useStyles = makeStyles({
  // container: {
  //   display: 'flex',
  //   flexDirection: 'column',
  //   justifyContent: 'center',
  //   alignItems: 'center',
  // },
  button: {
    height: 50,
    width: 250,
    borderRadius: 50,
    boxShadow: '0 5px 10px 5px rgba(128,128,128, .3)',
    fontSize: 15,
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


const sampleCoords = [
  {
    //gg park
    coordinates: {
      lat: 37.76941221629452,
      lng: -122.46322601611328
    }
  },
  {
    //buena vista park
    coordinates: {
      lat: 37.768611469310585,
      lng: -122.4415111541748
    }
  },
  {
    //alamo sqaure park
    coordinates: {
      lat: 37.776371218071695,
      lng: -122.43482708930969
    }
  },
  {
    //presidio
    coordinates: {
      lat: 37.79633638529349,
      lng: -122.46389066029026
    }
  },
  {
    //dolores park
    coordinates: {
      lat: 37.75979065676546,
      lng: -122.42717742919922
    }
  },
  {
    //lafayette park
    coordinates: {
      lat: 37.791650877460256,
      lng: -122.42759585380554
    }
  },
  {
    //fort mason
    coordinates: {
      lat: 37.80465296925594,
      lng: -122.43045885889566
    }
  },
  {
    //oracle park
    coordinates: {
      lat: 37.77809620209697,
      lng: -122.38994855963792
    }
  },
  {
    //washington square park
    coordinates: {
      lat: 37.80078155186425,
      lng: -122.41024732589722
    }
  },
  {
    //rincoln dog park
    coordinates: {
      lat: 37.786241459164756,
      lng: -122.39007711410522
    }
  },
  {
    //lands end
    coordinates: {
      lat: 37.78235220909234,
      lng: -122.50046147244002
    }
  },

];

function DropOffMap(props) {
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
};


  const renderMap = () => {

    return (
      <div className={classes.container}>
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={props.centerLocation}
          zoom={12}
        >

          {markers.map((marker, i) => (
            <Marker
              key={i}
              position={{lat: marker.coordinates.lat, lng: marker.coordinates.lng}}
              onClick={() => onSelect(marker)}
              icon={{
                url: 'http://localhost:300/poopTrashCan.png',
                scaledSize: new google.maps.Size(50, 50),
              }}
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
    )
  };

  return props.googleApiLoaded ? renderMap() : <div>noooo</div>

};

export default DropOffMap;

