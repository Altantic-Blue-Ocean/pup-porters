const axios = require('axios');
const config = require('../../config');


const getLongLatByPlace = async (place) => {

  const placeIdUrl = `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?inputtype=textquery&input=${place}&key=${config.token}`;
  try {
    const response = await axios.get(placeIdUrl)
    console.log('helper get place result here:')
    console.log(response.data.candidates[0].place_id)
    const placeId = response.data.candidates[0].place_id;

    const placeDetail = await axios.get(`https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&key=${config.token}`);

    const longLat = placeDetail.data.result.geometry.location;
    const name = placeDetail.data.result.name;

    return {longLat};

  } catch(error) {
    console.log('helper get place error here:')
    console.log(error)
  }
};

module.exports.getLongLatByPlace = getLongLatByPlace;
