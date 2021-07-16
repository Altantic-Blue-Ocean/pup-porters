import React, { useState, useEffect } from 'react'

function InfoWindowItem({coordinates}) {

  return (
    <>
      <b>hi</b>
      <div>POOP DROP OFF HERE</div>
      <div>lat: {coordinates.y}, lng: {coordinates.x}</div>
    </>
  )
};

export default InfoWindowItem;
