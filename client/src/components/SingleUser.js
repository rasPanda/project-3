import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { getLoggedInUserId, isCreator } from '../lib/auth'

import UserUpdateForm from './UserUpdate'

function SingleUser({ match, history }) {
  const userId = match.params.id
  const token = localStorage.getItem('token')

  const [user, setUser] = useState({})
  const [text, setText] = useState('')
  const [editState, changeEditState] = useState(false)
  const [uploadSuccess, updateUploadSuccess] = useState(false)
  const [formData, updateFormData] = useState({
    username: '',
    location: '',
    bio: '',
    image: ''
  })

  useEffect(() => {
    async function fetchUser() {
      try {
        const { data } = await axios.get(`/api/user/${userId}`)
        setUser(data)
        const mappedData = {
          ...data
        }
        updateFormData(mappedData)
      } catch (err) {
        console.log(err)
      }
    }
    fetchUser()
  }, [])

  function handleComment() {
    axios.post(`/api/user/${userId}`, { text }, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(resp => {
        setText('')
        setUser(resp.data)
      })
  }

  function handleCommentDelete(commentId) {
    axios.delete(`/api/user/${userId}/comment/${commentId}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(resp => {
        setUser(resp.data)
      })
  }

  function handleChange(event) {
    const { name, value } = event.target
    updateFormData({ ...formData, [name]: value })
  }

  async function handleSave() {
    const newFormData = { ...formData }
    try {
      const { data } = await axios.put(`/api/user/${userId}`, newFormData, {
        headers: { Authorization: `Bearer ${token}` }
      })
      console.log(data._id)
      changeEditState(false)
      // history.push(`/user/${data._id}`)
    } catch (err) {
      console.log(err.response.data)
    }
  }

  function handleUserDelete() {
    try {
      axios.delete(`/api/user/${userId}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      localStorage.removeItem('token')
      history.push('/users')
      location.reload()
    } catch (err) {
      console.log(err.response)
    }
  }

  function handleUpload() {
    //event.preventDefault()
    window.cloudinary.createUploadWidget(
      {
        cloudName: `${process.env.cloudName}`,
        uploadPreset: `${process.env.uploadPreset}`,
        cropping: true
      },
      (err, result) => {
        if (result.event !== 'success') {
          return
        }
        updateFormData({
          ...formData,
          image: `${result.info.secure_url}`
        })
        updateUploadSuccess(true)
      }
    ).open()
  }

  return <div className="section">
    <div className="column is-half is-offset-one-quarter">
      <Link className='button is-info mb-4' to={'/users'}>Back</Link>
      <div className="columns">
        {editState === false 
          ? <div className="column">
            <label className="label">Username:</label>
            <h1>{user.username}</h1>
            <label className="label">Location:</label>
            <h3>{user.location}</h3>
            <label className="label">Bio:</label>
            <h3>{user.bio}</h3>
          </div>
          : <UserUpdateForm
            handleSave={handleSave}
            handleChange={handleChange}
            formData={formData}
          />
        }
        <div className="column">
          <figure className="image is-1by1">
            <img className="is-rounded" src={user.image}></img>
          </figure>
          {editState &&  <div className="field">
            <button className="button is-hovered is-info" onClick={handleUpload}>Change profile pic</button>
            {uploadSuccess && <div><small className="has-text-primary">Upload Complete, <br></br>save to see changes</small></div>}
          </div>}
        </div>
      </div>
      <div className="section">
        {user.comments && <div className="container">
          Message board:
          <div className="column" id="commentsScroll">
            {user.comments.map((comment, index) => {
              return <div key={index} className="columns">
                <div className="column is-ful-width">
                  <article key={comment._id} className="media">
                    <div className="media-content">
                      <div className="content">
                        <p className="subtitle">
                          {comment.user.username}
                        </p>
                        <p>
                          {isCreator(comment.user._id) && <button
                            className='delete is-small is-pulled-right'
                            onClick={() => handleCommentDelete(comment._id)}
                          ></button>}
                          {comment.text}
                        </p> 
                      </div>
                    </div>
                  </article>
                </div>
                {/* {isCreator(comment.user._id) && <div className="column is-mulitline is-1">
                  <button className="button is-danger is-hovered" onClick={() => handleCommentDelete(comment._id)}>Delete</button>
                </div>} */}
              </div>
            })}
          </div>
        </div>
        }
        {getLoggedInUserId() &&
        <article className="media">
          <div className="media-content">
            <div className="field">
              <p className="control">
                <textarea
                  className="textarea"
                  placeholder="Write a message..."
                  onChange={event => setText(event.target.value)}
                  value={text}
                >
                  {text}
                </textarea>
              </p>
            </div>
            <div className="field">
              <p className="control">
                <button
                  className="button is-primary is-hovered"
                  onClick={handleComment}
                >
                  Submit
                </button>
              </p>
            </div>
          </div>
        </article>}
      </div>

      <div className="container is-half is-offset-one-quarter">
        {isCreator(userId) && <button className="button is-danger is-hovered m-4" onClick={handleUserDelete}>Delete account</button>}
        {isCreator(userId) && <button className="button is-warning is-hovered m-4" onClick={() => changeEditState(true)}>Update account</button>}
      </div>
    </div>
  </div>
}

export default SingleUser