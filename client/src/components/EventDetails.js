import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { isCreator } from '../lib/auth'
import { Link } from 'react-router-dom'

export default function singleEventPage({ match, history }) {
  const [event, getEvent] = useState({})
  const [newComment, updateNewComment] = useState({
    text: ''
  })
  const id = match.params.id
  const token = localStorage.getItem('token')

  useEffect(() => {
    async function fetchData() {
      const { data } = await axios.get(`/api/event/${id}`)
      getEvent(data)
    }
    fetchData()
  }, [])

  function handleChange(e) {
    updateNewComment({ ...newComment, text: e.target.value })
  }

  async function handleCommentSubmit(e) {
    e.preventDefault()
    console.log(id)
    try {
      await axios.post(`/api/event/${id}/`, newComment, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      location.reload()
    } catch (err) {
      console.log(err.response)
    }
  }

  async function handleDelete() {
    try {
      axios.delete(`/api/event/${id}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      history.push('/event')
    } catch (err) {
      console.log(err.response)
    }
  }

  async function handleCommentDelete(commentId) {
    try {
      axios.delete(`/api/event/${id}/comment/${commentId}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      location.reload()
    } catch (err) {
      console.log(err.response)
    }
  }

  if (!event.user) {
    return null
  }

  return <div className='container mt-4'>
    <div className="columns is-centered">
      <div className="column">
        <img src={event.image} />
        {isCreator(event.user._id) && <div className='field'><button
          className='button is-danger'
          onClick={handleDelete}
        >Delete & Cancel Event</button></div>}
        <Link className='button is-warning' to={'/events'}>Back</Link>
      </div>
      <div className="container">
        <div className="columns is-centered">
          <div className="column is-two-thirds">
            <div className="box mt-3">
              <div>{event.name}</div>
              <div><span>Location: </span>{<Link to={`/location/${event.location._id}`}>{event.location.name}</Link>}</div>
              <div><span>Host: </span>{<Link to={`/user/${event.user._id}`}>{event.user.username}</Link>}</div>
              <div><span>Time: </span>{event.time}</div>
              <div><h3>Details:</h3><div>{event.details}</div></div>
              {event.attendees.length > 0 &&
                <div><h3>Attendees:</h3>
                  {event.attendees.map(attendee => {
                    return <Link key={attendee._id} to={`/user/${event.user._id}`}>{attendee.user.username}</Link>
                  })}
                </div>}
            </div>
            <div>
              {event.comments.length > 0 &&
                <div><h3>Comments:</h3>
                  {event.comments.map(comment => {
                    return <div key={comment._id} className='notification is-size-7'>
                      {isCreator(comment.user._id) && <button
                        className='delete is-small is-pulled-right'
                        onClick={() => handleCommentDelete(comment._id)}
                      ></button>}
                      {comment.text}
                    </div>
                  })}
                </div>}
              <form className="box mt-3" onSubmit={handleCommentSubmit}>
                <label className='label'>Add a comment!</label>
                <textarea
                  className="textarea"
                  placeholder='Your comment here...'
                  type="text"
                  value={newComment.text}
                  onChange={handleChange}
                  name={'newComment'}
                />
                <button className='button is-warning mt-3'>Post</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>


}