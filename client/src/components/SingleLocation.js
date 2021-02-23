import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { isCreator } from '../lib/auth'
import { Link } from 'react-router-dom'

import LocationUpdateForm from './LocationUpdate'
import ShareButton from './ShareButton'

export default function singleLocationPage({ match, history }) {
  const [singleLocation, getSingleLocation] = useState({})
  const [newComment, updateNewComment] = useState({
    text: ''
  })
  const id = match.params.id
  const token = localStorage.getItem('token')
  const [editState, changeEditState] = useState(false)
  const [formData, updateFormData] = useState({
    name: '',
    location: '',
    address: '',
    facilities: {}
  })

  useEffect(() => {
    async function fetchData() {
      const { data } = await axios.get(`/api/location/${id}`)
      getSingleLocation(data)
      const mappedData = { ...data }
      updateFormData(mappedData)
    }
    fetchData()
  }, [])

  function handleChange(e) {
    updateNewComment({ ...newComment, text: e.target.value })
  }

  async function handleCommentSubmit(e) {
    e.preventDefault()
    try {
      await axios.post(`/api/location/${id}/`, newComment, {
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
      axios.delete(`/api/location/${id}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      history.push('/location')
    } catch (err) {
      console.log(err.response)
    }
  }

  async function handleCommentDelete(commentId) {
    try {
      axios.delete(`/api/location/${id}/comment/${commentId}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      location.reload()
    } catch (err) {
      console.log(err.response)
    }
  }

  function handleFormChange(event) {
    const { name, value } = event.target
    updateFormData({ ...formData, [name]: value })
  }

  async function handleSave() {
    const newFormData = { ...formData }
    try {
      const { data } = await axios.put(`/api/location/${id}`, newFormData, {
        headers: { Authorization: `Bearer ${token}` }
      })
      console.log(data)
      changeEditState(false)
      // history.push(`/user/${data._id}`)
    } catch (err) {
      console.log(err.response.data)
    }
  }

  if (!singleLocation.user) {
    return null
  }

  return <div className='container mt-4'>
    <div className="columns is-centered">
      <div className="column">
        <img src={singleLocation.image} />
        <div className='columns'>
          {isCreator(singleLocation.user._id) && <div className='column is-three-quarters'><button
            className='button is-danger'
            onClick={handleDelete}
          >Remove Location</button></div>}
          {isCreator(singleLocation.user._id) && <div className='column is-one-quarters'><button
            className='button is-info'
            onClick={() => changeEditState(true)}
          >Edit Location</button></div>}
        </div>

        <Link className='button is-warning' to={'/location'}>Back</Link>
        <ShareButton
          eventId={id}
        />
      </div>
      <div className="column is-half">
        <div className="columns is-centered">
          <div className="column">
            <div className="box mt-3">
              {editState === false
                ? <div>
                  <div>{singleLocation.name}</div>
                  <div><span>Address: </span>{singleLocation.address}</div>
                  {/* <div><span>Location: </span>{<Link to={`/user/${event.user._id}`}>{event.user.username}</Link>}</div> */}
                  <div><span>Number of Tables: </span>{singleLocation.facilities.numberOfTables}</div>
                  <div><h3>Description:</h3><div>{singleLocation.facilities.description}</div></div>
                </div>
                : <LocationUpdateForm
                  handleSave={handleSave}
                  handleFormChange={handleFormChange}
                  formData={formData}
                />
              }
              {singleLocation.events.length > 0 &&
                <div><h3>Upcoming Events:</h3>
                  {singleLocation.events.map(event => {
                    return <Link key={event._id} to={`/event/${event._id}`}>{event.name}</Link>
                  })}
                </div>}
            </div>
            <div>
              {singleLocation.comments.length > 0 &&
                <div><h3>Comments:</h3>
                  {singleLocation.comments.map(comment => {
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
                <button className='button is-info is-hovered mt-3'>Post</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>


}