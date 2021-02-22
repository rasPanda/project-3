import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { isCreator } from '../lib/auth'

function SingleUser({ match, history }) {
  const userId = match.params.id
  const token = localStorage.getItem('token')
  const [user, setUser] = useState({})
  const [text, setText] = useState({})

  useEffect(() => {
    async function fetchUser() {
      try {
        const { data } = await axios.get(`/api/user/${userId}`)
        setUser(data)
      } catch (err) {
        console.log(err)
      }
    }
    fetchUser()
  }, [])

  function handleComment() {
    axios.post(`/api/user/${userId}`, { text }, {
      headers: {Authorization: `Bearer ${token}` }
    })
      .then(resp => {
        setText('')
        setUser(resp.data)
      })
  }

  return <div className="section">
    <div className="column is-half is-offset-one-quarter">
      <div className="columns">
        <div className="column">
          <h1>{user.username}</h1>
          <h3>{user.location}</h3>
          <h3>{user.bio}</h3>
        </div>
        <div className="column">
          <figure className="image is-4by3">
            <img src=""></img>
          </figure>
        </div>
      </div>
      {user.comments && <div className="container">
        <div className="column">
          {user.comments.map((comment) => {
            return <article key={comment._id} className="media">
              <div className="media-content">
                <div className="content">
                  <p className="subtitle">
                    {comment.user.username}
                  </p>
                  <p>{comment.text}</p>
                </div>
              </div>
            </article>
          })}
        </div>
      </div>
      }
      <article className="media">
        <div className="media-content">
          <div className="field">
            <p className="control">
              <textarea
                className="textarea"
                placeholder="Make a comment..."
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
                className="button is-info"
                onClick={handleComment}
              >
                Submit
              </button>
            </p>
          </div>
        </div>
      </article>

      <div className="container is-half is-offset-one-quarter">
        {isCreator(userId) && <button className="button is-danger">Delete account</button>}
        {isCreator(userId) && <button className="button is-secondary">Update account</button>}
        <button className="button is-danger">Delete account</button>
        <button className="button is-secondary">Update account</button>
      </div>   
    </div> 
  </div>

}

export default SingleUser