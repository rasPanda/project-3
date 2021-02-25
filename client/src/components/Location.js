import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

import Map from './Map.js'
import '../styles/style.scss'
export default function Location({ location }) {
  const [long, getLong] = useState(-0.118)
  const [lat, getLat] = useState(51.519)
  const [zoom, setZoom] = useState(12)
  const [ready, setReady] = useState(false)
  const [locations, updateLocation] = useState([])
  const [sideCard, revealSideCard] = useState(false)
  const [toggle, updateToggle] = useState(false)
  const [selectedLocation, updateselectedLocation] = useState({
    id: '',
    name: '',
    location: '',
    user: '',
    address: '',
    facilities: '',
    description: '',
    image: '',
    comments: ''
  })

  if (location.state && !ready) {
    getLong(location.state.place.long)
    getLat(location.state.place.lat)
    setZoom(13)
    setReady(true)
  } 


  function handleSelectedLocation({ _id, name, location, address, facilities, description, image, comments, user }) {
    const LocationDetails = {
      id: _id,
      name: name,
      location: location.name,
      address: address,
      facilities: facilities,
      description: description,
      image: image,
      comments: comments,
      user: user
    }
    updateselectedLocation(LocationDetails)
    if (!sideCard) {
      revealSideCard(true)
    }
  }
  //toggle between map or card loation
  // const toggling = () => {
  //   updateToggle(!toggle)
  // }

  useEffect(() => {
    axios.get('/api/location')
      .then(axiosResp => {
        updateLocation(axiosResp.data)
      })
  }, [])
  //<i class="fas fa-globe-americas"></i>
  //<i class="fas fa-th"></i>
  return (
    <main>
      <div className='toggle-container'>
        <button className='toggle' onClick={() => updateToggle(true)}>Grid</button>
        <button className='toggle' onClick={() => updateToggle(false)}>Map</button>
      </div>
      {toggle ?
        <section className="section">
          <div className="container">
            <div className='columns'>
              <div className={!sideCard ? 'column' : 'column is-two-thirds'}>
                <div className="columns is-multiline">
                  {locations.map((location) => {
                    return <div key={location._id} className={!sideCard ? 'column is-one-third' : 'column is-half'} >
                      <div className="card" id={selectedLocation.id === location._id ? 'selected' : 'cardHover'} onClick={() => handleSelectedLocation(location)}>
                        <div className="card-content">
                          <div className="media">
                            <div className="media-content">
                              <p className="title is-4">{location.name}</p>
                              <p className="subtitle is-6">{location.address}</p>
                              <img src={location.image} alt={location.name} />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  })}
                </div>
              </div>
              {sideCard && <div className="column is-one-third">
                <div className='card' id='fixed'>
                  <div className="card-content">
                    <div className="media">
                      <div className="media-content">
                        <button className='delete is-pulled-right' onClick={() => revealSideCard(false)} />
                        <p className="title is-4">{selectedLocation.name}</p>
                        <img src={selectedLocation.image} alt={selectedLocation.name} />
                        <p className="subtitle is-6">{selectedLocation.address}</p>
                        <p className="subtitle is-6">{'Description: ' + selectedLocation.facilities.description}</p>
                        <Link className='button is-info is-hovered' to={`/location/${selectedLocation.id}`}>Go to Location</Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>}
            </div>
          </div>
        </section>
        :
        <Map
          long={long}
          lat={lat}
          zoom={zoom}
          coordinate={locations.map((coordinate) => {
            return coordinate.location
          }
          )}
        />
      }
    </main >
  )
}