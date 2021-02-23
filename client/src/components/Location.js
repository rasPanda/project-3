import React, { useState, useEffect } from 'react'
import axios from 'axios'

// import Map from './Map.js'


const Location = () => {
  const [locations, updateLocation] = useState([])
  const [sideCard, revealSideCard] = useState(false)
  const [selectedLocation, updateselectedLocation] = useState({
    id: '',
    name: '',
    location: '',
    user: '',
    address: '',
    facilities: '',
    description: '',
    image: ''
  })
  function handleSelectedEvent({ _id, name, location, address, facilities, description, image, comments, user }) {
    const selectedLocation = {
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
    updateselectedLocation(selectedLocation)
  }

  useEffect(() => {
    axios.get('/api/location')
      .then(axiosResp => {
        updateLocation(axiosResp.data)
        console.log(axiosResp.data)
      })
  }, [])

  return (
    <main>
      <section className="container">
        <div className='columns'>
          <div className={!sideCard ? 'column' : 'column is-two-thirds'}>
            <div className="columns is-multiline">
              {locations.map((location) => {
                return <div key={location._id} className={!sideCard ? 'column is-one-third' : 'column is-half'} >
                  <div className="card" onClick={() => handleSelectedEvent(location)}>
                    <div className="card-content">
                      <div className="media">
                        <div className="media-content">
                          <p className="title is-4">{location.name}</p>
                          <p className="subtitle is-6">{location.address}</p>
                          <p className="subtitle is-6">{location.facilities.description}</p>
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
              <p className="subtitle is-6">{selectedLocation.location}</p>
              <p className="subtitle is-6">{'Host: ' + selectedLocation.user}</p>
              <p className="subtitle is-6">{'Attendees: ' + selectedLocation.description}</p>
              <p className="subtitle is-6">{selectedLocation.time}</p>
              <p className="subtitle is-6">{selectedLocation.details}</p>
              <Link className='button' to={`/event/${selectedLocation.id}`}>Go to Location</Link>
              {/* {selectedEvent.comments.length > 0 &&
                <div>
                  <p className="subtitle is-7">Comments:</p>
                  {selectedLocation.comments.map(comment => {
                    return <div key={comment._id} className='box'>
                      {comment.user.username}
                      {comment.text}
                    </div>
                  })}
                </div>} */}
            </div>
          </div>}
        </div>
      </section>
    </main >
  )
}

export default Location