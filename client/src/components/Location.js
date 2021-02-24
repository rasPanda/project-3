import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

import Map from './Map.js'
import '../styles/style.scss'
const Location = () => {
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
                      <div className="card" onClick={() => handleSelectedLocation(location)}>
                        <div className="card-content">
                          <div className="media">
                            <div className="media-content">
                              <p className="title is-4">{location.name}</p>
                              <p className="subtitle is-6">{location.address}</p>
                              <p className="subtitle is-6">{location.facilities.description}</p>
                              <p className="subtitle is-6">Created by: {location.user.username}</p>
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
                <div className='box' id='fixed'>
                  <button className='delete is-pulled-right' onClick={() => revealSideCard(false)} />
                  <p className="title is-4">{selectedLocation.name}</p>
                  <img src={selectedLocation.image} alt={selectedLocation.name} />
                  <p className="subtitle is-6">{selectedLocation.address}</p>
                  <p className="subtitle is-6">{'Organiser: ' + selectedLocation.user.username}</p>
                  <p className="subtitle is-6">{'Description: ' + selectedLocation.facilities.description}</p>
                  <Link className='button' to={`/location/${selectedLocation.id}`}>Go to Location</Link>
                </div>
              </div>}
            </div>
          </div>
        </section>
        :
        <Map corrdinate={locations.map((corrdinate) => {
          return corrdinate.location
        }
        )}
        id={locations.id}
        />
      }
    </main >
  )
}

export default Location