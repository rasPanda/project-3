import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { isCreator } from '../lib/auth'
import { Link } from 'react-router-dom'
import UserModal from './UserModal'


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
  console.log(selectedUser)

  return <div className="section is-half is-offset-one-quarter">
    <div className="columns">
      <div className="column">
        <div className="container">
          <div className="columns is-multiline is-mobile">
            {users.map((user, index) => {
                return <div key={index} className="column is-one-third-desktop is-half-tablet is-half-mobile">
                  <div className="card" onClick={() => {showModal(user)}}>
                    <div className="card-image">
                      <figure className="image is-4by3">
                        {/* <img src={user.image}></img> */}
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
        <UserModal
          user={selectedUser}
        />
      </div>}
    </div>
  </div>
}

export default Users