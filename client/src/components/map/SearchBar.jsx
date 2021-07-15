import React, { useState, useEffect, useRef } from "react";
import config from '../../../../config.js';
import { makeStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';

const useStyles = makeStyles({
  searchBar: {
    display: 'flex',
    width: '300%',
    height: '70%',
    textAlign: 'center',
  },
  button: {
    height: '2em',
    width: '7em',
    borderRadius: 0
  }
})

let autoComplete = null;

async function handlePlaceSelect(updateQuery) {
  const addressObject = autoComplete.getPlace();
  const query = addressObject.address_components[0].long_name;
  updateQuery(query);
  console.log(addressObject);
}

function SearchBar(props) {
  const [query, setQuery] = useState("");
  const autoCompleteRef = useRef(null);

  if (props.googleApiLoaded && autoComplete === null) {
    const southwest = { lat: 37.712, lng: -122.537 };
    const northeast = { lat: 37.826, lng: -122.370 };
    const bounds = new google.maps.LatLngBounds(southwest, northeast);

    autoComplete = new window.google.maps.places.Autocomplete(autoCompleteRef.current, {
      bounds: bounds,
      componentRestrictions: { country: "us" },
      strictBounds: true,
    });

    autoComplete.setFields(["address_components", "formatted_address"]);
    autoComplete.addListener("place_changed", () =>
      handlePlaceSelect(setQuery)
    );
};

const handleSubmitDest = (event) => {
  event.preventDefault();
  props.getCenterLocation(query);
  setQuery('');
};

  const styles = useStyles();

  return (
    <form>
      <div className="search-location-input">
        <input
          ref={autoCompleteRef}
          onChange={event => setQuery(event.target.value)}
          placeholder="SEARCH IN SAN FRANCISCO"
          value={query}
          className={styles.searchBar}
        />
      </div>
      <Button onClick={handleSubmitDest} variant='contained' size='large' color='primary' className={styles.button}>Enter</Button>
    </form>
  );
};

export default SearchBar;
