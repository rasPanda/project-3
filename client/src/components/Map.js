import React, { useEffect, useState } from 'react'
import ReactMapGL, { Marker } from 'react-map-gl'
import { Link } from 'react-router-dom'

const Map = ({ id, corrdinate }) => {
  console.log(corrdinate)
  console.log(id)
  const [markerData, setMarkerData] = useState([])
  const [viewport, setViewport] = React.useState({
    width: '88vw',
    height: '70vh',
    latitude: 51.5167,
    longitude: -0.05,
    zoom: 15
  })
  let markers = ''
  if (corrdinate) {
    markers = corrdinate.map((location, i) => {
      const latLong = {
        lat: Number(location.lat),
        long: Number(location.long)
      }
    })
  }
  return (
    <>
      <div className="map-container" style={{ width: '93vw', height: '80vh', display: 'flex', justifyContent: 'center', borderRadius: '20px', margin: '100px auto 0 auto ', boxShadow: '0 5px 8px -2px black' }}>
        <ReactMapGL
          {...viewport}
          onViewportChange={(viewport) => setViewport(viewport)}
          mapboxApiAccessToken={'pk.eyJ1IjoieXVzdWY5NjMiLCJhIjoiY2traTc5N2cxMWtscjJ3cXRycHVxbnM5ayJ9.ZyAS9QfUaYL-HexSX-UVDQ'}
        />
      </div>
    </>
  )
}

export default Map