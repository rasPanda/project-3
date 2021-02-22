import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { isCreator } from '../lib/auth'

export default function UserModal( props ) {
  const [user, setUser] = useState({})

  useEffect(() => {
    setUser(props.user)
  }, [props])

  return <div className="container">
    {/* {isModal &&  */}
    <button className="delete" onClick={() => {setIsModal(false)}}></button>
    <div className="column is-full">
      <figure className="image is-4by3">
        Image placeholder...
      </figure>
      <h1>Name: {user.username}</h1>
      <h3>Location: {user.location}</h3>
      <h4>Bio:</h4>
      <h3>{user.bio}</h3>
      <Link to={`/user/${user._id}`}>
        <button className="button is-primary">User's Page</button>
      </Link>
      <h4>Comments:</h4>
      <div>
        {console.log(user.comments)}
      </div>
    </div>
  </div>
}