import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { isCreator } from '../lib/auth'
import { Link } from 'react-router-dom'

const Users = () => {
  const [users, setUsers] = useState([])
  const [isModal, setIsModal] = useState(false)
  const [selectedUser, setSelectedUser] = useState({})

  useEffect(() => {
    axios.get('/api/user')
      .then(axiosResp => {
        setUsers(axiosResp.data)
      })
  }, [])

  function showModal(user) {
    setIsModal(true)
    setSelectedUser(user)
  }

  // console.log(users)
  // console.log(isModal)
  // console.log(selectedUser)

  return <div className="section is-half is-offset-one-quarter">
    <div className="columns">

      <div className="column">
        <div className="container">
          <div className="columns is-multiline is-mobile">
            {users.map((user, index) => {
                return <div key={index} className={!isModal? "column is-one-third" : "column is-half"}>
                  <div className="card" onClick={() => {showModal(user)}}>
                    <div className="card-image">
                      <figure className="image is-4by3">
                        <img src={user.image}></img>
                        Image placeholder...
                      </figure>
                    </div>
                    <div className="content">
                      <h3>{user.username}</h3>
                      <h4>{user.location}</h4>
                      {/* Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Phasellus nec iaculis mauris. <a>@bulmaio</a>.
                      <a href="#">#css</a> <a href="#">#responsive</a> */}
                    </div>
                  </div>
                </div>
              })}
          </div>
        </div>
      </div>

      {isModal && <div className="column is-narrow is-one-third">
        <div className="container" id="fixed">
          <button className="delete" onClick={() => {setIsModal(false)}}></button>
          <div className="column is-full">
            <figure className="image is-1by1">
              <img className="is-rounded" id="modalImage" src={selectedUser.image}></img>
            </figure>
            <h1>Name: {selectedUser.username}</h1>
            <h3>Location: {selectedUser.location}</h3>
            <h4>Bio:</h4>
            <h3>{selectedUser.bio}</h3>
            <Link to={`/user/${selectedUser._id}`}>
              <button className="button is-primary">User's Page</button>
            </Link>
          </div>
          {selectedUser.comments && <div className="container is-clipped">
            <h4>Comments:</h4>
            <div className="column" id="commentsScroll">
              {selectedUser.comments.map((comment) => {
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
          </div>}
        </div>
      </div>}

    </div>
  </div>
}

export default Users