/*global google */
import React, { useState, useEffect, useRef, useCallback } from 'react';
import config from '../../../../../config.js';
import { GoogleMap, ScriptLoaded, useLoadScript, Marker, InfoWindow } from '@react-google-maps/api';
import InfoWindowItem from './InfoWindowItem.jsx';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Button, Slide } from '@material-ui/core';
import { useAuth } from '../../../contexts/AuthContext.js';

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
    icon: {url: 'poop.png'}
  },
  {
    coordinates: {
    lat: 37.759773,
    lng: -122.427063
    },
    icon: {url: 'poop.png'}
  },
  {
    coordinates: {
    lat: 37.781372,
    lng: -122.394241
    },
    icon: {url: 'poop.png'}
  },
  {
    coordinates: {
    lat: 37.769722,
    lng: -122.476944
    },
    icon: {url: 'poop.png'}
  },
  {
    coordinates: {
    lat: 37.769722,
    lng: -122.476944
    },
    icon: {url: 'poop.png'}
  },
];

function RemoverMap2(props) {
  /*
    make this component top level (skip sign in)
    hardcode currentUser to some random string

    componentMount:
      fetch availablePiles
        success->setState(availablePiles)
      fetch claimedPiles
        success->filter to current user id
                 setState(claimedPiles)

    render:
      foreach availablePile
        draw available marker
      foreach claimedPile
        draw claimed marker

    onOwnButton: (clicked on some available pile)
      claim = { avilable_pile_id: clickedPile.id, remover_user_id: currentUser.id }
      POST /claimedPiles, claim
        success->setState(availablePiles removing clicked pile)
               ->claimedPiles(claimedPiles adding POST result)

    onDropOff: (clicked on claimed pile)
      DELETE /claimedPiles, pile
        success->setState(claimedPiles removing clicked pile)

    import useAuth + currentUser
  */

  const classes = useStyles();

  const { currentUser } = useAuth()

  const [selected, setSelected] = useState({});
  const [markers, setMarkers] = useState([]);
  const [openWindow, setOpenWindow] = useState(false);
  const [isClaimed, setStatus] = useState(false);
  const [claimedFlags, setClaimedFlags] = useState([]);
  const [availableFlags, setAvailableFlags] = useState([]);
  const [icon, setIcon] = useState({});


  useEffect(() => {
    // setMarkers(sampleCoords);

    // getRemoverMap();
    //MAP OVER RES.DATA TO SET ICON PROPERTY FOR EACH FLAG
    console.log("Fetching existing markers");
    axios.get('/availablePiles')
    .then((res) => {
      console.log('HERE;')
      console.log(res.data);
      let newAvailableList = res.data.map((pile) => {
        return pile = {
          id: pile.id,
          caregiver_user_id: pile.caregiver_user_id,
          coords: pile.coords,
          icon: {
            url: 'poop.png',
            scaledSize: new google.maps.Size(50, 50),
          }
        }
      })
      setAvailableFlags(availableFlags.concat(newAvailableList));
    })
    .catch((err) => {
      console.log(err);
    })

  }, []);

  useEffect(() => {
    //MAP OVER RES.DATA TO SET ICON PROPERTY FOR EACH FLAG
    console.log("Fetching claimed markers");
    axios.get('/claimedPiles')
    .then((res) => {
      console.log(res);
      let newClaimedList = res.data.map((claimedPile) => {
        return claimedPile = {
          id: claimedPile.id,
          caregiver_user_id: claimedPile.caregiver_user_id,
          coords: claimedPile.coords,
          icon: {
            url: 'poopblue.png',
            scaledSize: new google.maps.Size(50, 50),
          }
        }
      })
      setClaimedFlags(claimedFlags.concat(newClaimedList));
    })
    .catch((err) => {
      console.log(err);
    })
  }, []);


  // const getRemoverMap = async () => {
  //   try {

  //     const res = await axios.get('/availablepiles);
  //     let removerCoords = res.data;
  //     setMarkers(removerCoords);

  //   } catch(error) {
  //     console.log(error);
  //   }
  // }


 const onSelect = (item) => {
  setSelected(item);
  setOpenWindow(true);
  console.log(item)
  // availableFlags.filter((marker) => {
  //   console.log(marker)
  //   if (marker.coords.lat === item.coords.lat) {
  //     item.icon = {
  //       url: 'poopblue.png',
  //       scaledSize: new google.maps.Size(50, 50),
  //     }
  //   }
  // })



};

const handleRemoveMarker = (selected) => {
  let newList = availableFlags.filter((mark) => {
    return mark.coords.lat !== selected.coords.lat;
  });
  setAvailableFlags(newList);
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

const sendClaim = async (selected) => {
  console.log('WHAT IS CLAIMED')
  console.log(selected)
  availableFlags.filter((marker) => {
    console.log(marker)
    if (marker.coords.lat === selected.coords.lat) {
      marker.icon = {
        url: 'poopblue.png',
        scaledSize: new google.maps.Size(50, 50),
      }
    }
  })

  let claimedPile = {
    remover_user_id: selected.caregiver_user_id,
    available_pile_id: selected.id,
    coords: {
      x: selected.coords.lat,
      y: selected.coords.lng
    }
  }
  try {
    console.log(claimedPile)
    let res = await axios.post('/claimedPiles', claimedPile);
    let updatedAvailabelPile = availableFlags.filter((pile) => {
      return pile.coords.lat !== claimed.coords.lat;
    })
    setAvailableFlags(updatedAvailabelPile);
  } catch(error) {
    console.log(error)
  }
}


// console.log('markers')
// console.log(markers)

// console.log('SELECTED COORDINATES HERE:')
// console.log(selected.coordinates)

  const renderMap = () => {
    let icon = {
      url: 'poop.png',
      scaledSize: new google.maps.Size(50, 50),
    };

    console.log('AVAILABLE FLAGS HERE')
    console.log(availableFlags)
    console.log('CLAIMED FLAGS HERE:')
    console.log(claimedFlags)

    console.log('SELECTED');
    console.log(selected)

    return (
      <div>
        <div className={classes.outer}>
          <div className={classes.head}>
            <Typography className={classes.instruction}>
              Select Pup Pile TM</Typography>
          </div>
        </div>
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={props.centerLocation}
          // center={props.center}
          zoom={12}
        >

          {claimedFlags.map((claimedFlag, i) => (
            <Marker
              key={i}
              position={claimedFlag.coords}
              onClick={() => onSelect(claimedFlag)}
              icon={{
                url: 'poopblue.png',
                scaledSize: new google.maps.Size(50, 50),
              }}
              animation={window.google.maps.Animation.DROP}
            />
          ))}

          {availableFlags.map((availableFlag, i) => (
            <Marker
              key={i}
              position={availableFlag.coords}
              onClick={() => onSelect(availableFlag)}
              icon={availableFlag.icon}
              animation={window.google.maps.Animation.DROP}
            />
          ))}

        {openWindow &&
        (
          <InfoWindow
            position={selected.coords}
            clickable={true}
            onCloseClick={() => setOpenWindow(false)}
          >
            <>
            <InfoWindowItem
              coordinates={selected.coords}
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
              sendClaim(selected);
              setStatus(true);
            }}>
            Own
          </Button>) : (
          <Button
            variant="contained"
            color="primary"
            className={classes.button}
            onClick={() => handleRemoveMarker(selected)}>
            Complete
          </Button>
          )
        }
        </div>
      </div>
    )
  }

  return props.googleApiLoaded ? renderMap() : <div>noooo</div>

};

export default RemoverMap2;
