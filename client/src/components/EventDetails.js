import React, { useEffect, useState } from 'react'
import axios from 'axios'

export default function singleEventPage({ match, history }) {
  const [event, getEvent] = useState({})
  const [user, getUser] = useState({})
  const id = match.params.id
  const token = localStorage.getItem('token')

  useEffect(() => {
    async function fetchData() {
      const { data } = await axios.get(`/api/event/${id}`)
      getEvent(data)
      getUser(data.user)
    }
    fetchData()
  }, [])

  function handleChange(e) {
    updateNewComment({ ...newComment, text: e.target.value })
  }

  async function handleSubmit(e) {
    e.preventDefault()
    try {
      await axios.post(`/api/event/${id}/comment/`, newComment, {
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

  return <div className='container mt-4'>
    <div className="columns is-centered">
      <div className="column">
        <img src={event.image} />
        {isCreator(event.user._id) && <div className='field'><button
          className='button is-danger'
          onClick={handleDelete}
        >Delete & Cancel Event</button></div>}
      </div>
      <div className="container">
        <div className="columns is-centered">
          <div className="column is-two-thirds">
            <div className="box mt-3">
              <div>{event.name}</div>
              <div>Number: {event.number}</div>
              <div>Weight: {event.weight}</div>
              <div>Types: {event.join(', ')}</div>
              <div>Trainer: {user.username}</div>
              {comments.length > 0 &&
                <div><h3>Comments:</h3>
                  {comments.map(comment => {
                    return <div key={comment._id} className='notification is-size-7'>
                      {isCreator(pokemon.user._id) && <button
                        className='delete is-small is-pulled-right'
                        onClick={() => handleCommentDelete(comment._id)}
                      ></button>}
                      {comment.text}
                    </div>
                  })}
                </div>}
            </div>
            <form className="box mt-3" onSubmit={handleSubmit}>
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
            <Link className='button is-warning' to={'/events'}>Back</Link>
          </div>
        </div>
      </div>
    </div>
  </div>


}