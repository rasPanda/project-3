import React, { useState } from 'react'
import ReactMapGL, { Marker } from 'react-map-gl'
import { Link } from 'react-router-dom'
const imgUrl = '../asset/MapPingPongPin.png'

const Map = ({ long, lat, zoom, coordinate }) => {
  const [markerData, setMarkerData] = useState([])
  const [viewport, setViewport] = React.useState({
    width: '88vw',
    height: '70vh',
    latitude: lat,
    longitude: long,
    zoom: zoom
  })

  // let markers = ''
  // if (corrdinate) {
  //   markers = corrdinate.map((location, i) => {
  //     const latLong = {
  //       lat: Number(location.lat),
  //       long: Number(location.long)
  //     }
  //     console.log(latLong)
  //   })
  // }
  return (
    <>
      <div className="map-container" style={{ width: '93vw', height: '80vh', display: 'flex', justifyContent: 'center', borderRadius: '20px', margin: '100px auto 0 auto ', boxShadow: '0 5px 8px -2px black' }}>
        <ReactMapGL
          {...viewport}
          onViewportChange={(viewport) => setViewport(viewport)}
          mapboxApiAccessToken={process.env.MAPBOX_TOKEN}
        >
          {coordinate.map((coor, index) =>
            <Marker
              key={index}
              latitude={coor.lat}
              longitude={coor.long}
            >
              <Link to='/'><img width={30} src={imgUrl} /></Link>
            </Marker>
          )}
        </ReactMapGL >
      </div>
    </>
  )
}

export default Map