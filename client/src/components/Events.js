import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

export default function EventsPage() {
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
    console.log(event.id)
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
<<<<<<< HEAD

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
=======
    <div className="section">
      <section className="container">
        <div className='columns'>
          <div className={!sideCard ? 'column' : 'column is-two-thirds'}>
            <div className="columns is-multiline">
              {eventData.map((event) => {
                return <div key={event._id} className={!sideCard ? 'column is-one-third' : 'column is-half'} >
                  <div className="card" id="cardHover" onClick={() => handleSelectedEvent(event)}>
                    <div className="card-content">
                      <div className="media">
                        <div className="media-content">
                          <p className="title is-4">{event.name}</p>
                          <p className="subtitle is-6">{event.location.name}</p>
                          <p className="subtitle is-6">{event.time}</p>
                          <figure className="image is-4by3">
                            <img src={event.image} alt={event.name} />
                          </figure>
                        </div>
>>>>>>> development
                      </div>
                    </div>
                  </div>
                </div>
              })}
            </div>
          </div>
          {sideCard && <div className="column is-one-third">
            <div className='container' id='fixed'>
              <button className='delete is-pulled-right' onClick={() => revealSideCard(false)} />
              <p className="title is-4">{selectedEvent.name}</p>
              <img src={selectedEvent.image} alt={selectedEvent.name} />
              <p className="subtitle is-6">{selectedEvent.location}</p>
              <p className="subtitle is-6">{'Host: ' + selectedEvent.user}</p>
              <p className="subtitle is-6">{'Attendees: ' + selectedEvent.attendees}</p>
              <p className="subtitle is-6">{selectedEvent.time}</p>
              <p className="subtitle is-6">{selectedEvent.details}</p>
              <Link className='button is-hovered is-info' to={`/event/${selectedEvent.id}`}>Go to Event</Link>
              {selectedEvent.comments.length > 0 &&
                <div>
                  <p className="subtitle is-7">Comments:</p>
                  {selectedEvent.comments.map(comment => {
                    return <div key={comment._id} className='box'>
                      {comment.user.username}
                      {comment.text}
                    </div>
                  })}
                </div>}
            </div>
          </div>}
        </div>
      </section>
    </div>
  </main>
}

