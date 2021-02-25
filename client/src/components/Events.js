import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

export default function EventsPage() {
  const [filterTerm, setFilterTerm] = useState('')
  const [eventData, updateEventData] = useState([])
  const [sideCard, revealSideCard] = useState(false)
  const [selectedEvent, updateSelectedEvent] = useState({
    id: '',
    name: '',
    location: '',
    user: '',
    attendees: '',
    time: '',
    details: '',
    image: ''
  })

  function handleSelectedEvent({ _id, name, location, user, attendees, time, details, image, comments }) {
    const event = {
      id: _id,
      name: name,
      location: location.name,
      user: user.username,
      attendees: attendees.length,
      time: time,
      details: details,
      image: image,
      comments: comments
    }
    updateSelectedEvent(event)
    if (!sideCard) {
      revealSideCard(true)
    }
  }

  useEffect(() => {
    axios.get('api/event')
      .then(res => {
        updateEventData(res.data)
      })
  }, [])

  function hideSideCard() {
    updateSelectedEvent({
      id: '',
      name: '',
      location: '',
      user: '',
      attendees: '',
      time: '',
      details: '',
      image: ''
    })
    revealSideCard(false)
  }

  function handleChange(event) {
    event.preventDefault()
    const value = event.target.value
    setFilterTerm(value)
  }

  function filterEvents() {
    return eventData.filter((event) => {
      return event.name.toLowerCase().includes(filterTerm.toLowerCase())
    })
  }

  return <main>
    <section className="section" id="eventSectionBackground">
      <div className="container mb-3">

        <div className="column">
          <input
            type="text"
            placeholder="Search by name..."
            className="input is-info is-rounded is-9"
            onChange={(event) => handleChange(event)}
            value={filterTerm}
          />
        </div>

        <div className='columns'>
          <div className={!sideCard ? 'column' : 'column is-two-thirds'}>
            <div className="columns is-multiline">
              {filterEvents().map((event) => {
                return <div key={event._id} className={!sideCard ? 'column is-one-third' : 'column is-half'} >
                  <div className="card" id={selectedEvent.id === event._id ? 'selected' : 'cardHover'} onClick={() => handleSelectedEvent(event)}>
                    <div className="card-content">
                      <div className="media">
                        <div className="media-content">
                          <p className="title is-4">{event.name}</p>
                          <figure className="image is-4by3 mb-2">
                            <img src={event.image} alt={event.name} />
                          </figure>
                          <p className="subtitle is-6">{event.location.name}</p>
                          <p className="subtitle is-6">{event.time}</p>
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
                    <button className='delete is-pulled-right' onClick={() => hideSideCard()} />
                    <p className="title is-4">{selectedEvent.name}</p>
                    <img src={selectedEvent.image} alt={selectedEvent.name} />
                    <p className="subtitle is-6">{selectedEvent.location}</p>
                    <p className="subtitle is-6">{selectedEvent.time}</p>
                    <p className="subtitle is-6">{'Host: ' + selectedEvent.user}</p>
                    <Link className='button is-hovered is-info' to={`/event/${selectedEvent.id}`}>Go to Event</Link>
                  </div>
                </div>
              </div>
            </div>
          </div>}
        </div>
      </div>
    </section>
  </main>
}

