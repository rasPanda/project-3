import React, { useEffect, useState } from 'react'
import axios from 'axios'

export default function EventsPage() {
  const [eventData, updateEventData] = useState([])
  const [sideCard, revealSideCard] = useState(false)
  const [selectedEvent, updateSelectedEvent] = useState({
    name: '',
    location: '',
    user: '',
    attendees: '',
    time: '',
    details: '',
    image: ''
  })

  function handleSelectedEvent({ name, location, user, attendees, time, details, image }) {
    const event = {
      name: name,
      location: location.name,
      user: user.username,
      attendees: attendees.length,
      time: time,
      details: details,
      image: image
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

  return <main>
    <section className="container">
      <div className='columns'>
        <div className={!sideCard ? 'column' : 'column is-two-thirds'}>
          <div className="columns is-multiline">
            {eventData.map((event) => {
              return <div key={event._id} className={!sideCard ? 'column is-one-third' : 'column is-half'} >
                <div className="card" onClick={() => handleSelectedEvent(event)}>
                  <div className="card-content">
                    <div className="media">
                      <div className="media-content">
                        <p className="title is-4">{event.name}</p>
                        <p className="subtitle is-6">{event.location.name}</p>
                        <p className="subtitle is-6">{event.time}</p>
                        <img src={event.image} alt={event.name} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            })}
          </div>
        </div>
        {sideCard && <div className="column">
          <div className='box'>
            <p className> </p>
            <p className="title is-4">{selectedEvent.name}</p>
            <p className="subtitle is-6">{selectedEvent.location}</p>
            <p className="subtitle is-6">{'Host: ' + selectedEvent.user}</p>
            <p className="subtitle is-6">{'Attendees: ' + selectedEvent.attendees}</p>
            <p className="subtitle is-6">{selectedEvent.time}</p>
            <p className="subtitle is-6">{selectedEvent.details}</p>
            <img src={selectedEvent.image} alt={selectedEvent.name} />
          </div>
        </div>}
      </div>
    </section>
  </main>
}