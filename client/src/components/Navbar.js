import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getLoggedInUserId } from '../lib/auth'
import axios from 'axios'
import Logo from '../asset/Logo.jpeg'

const Navbar = () => {
  const [logIn, updateLogin] = useState(false)
  const [userId, setUserId] = useState('')
  const [userName, setUserName] = useState('')
  useEffect(() => {
    const handleLogin = () => {
      const token = localStorage.getItem('token')
      if (token) {
        //change the button to logout
        updateLogin(true)
        setUserId(getLoggedInUserId())
      }
    }
    handleLogin()
  }, [])

  useEffect(() => {
    async function fetchUser() {
      try {
        const { data } = await axios.get(`/api/user/${userId}`)
        setUserName(data.username)
      } catch (err) {
        console.log(err)
      }
    }
    fetchUser()
  }, [userId])

  //loggingOut
  const logOut = () => {
    localStorage.removeItem('token')
    location.reload()
  }

  

  return (
    <nav className="navbar" role="navigation" aria-label="main navigation">
      
      <div className="navbar-brand" id="navbarImage">
        <img src={Logo} width="212" height="28" />
      </div>
      <div id="navbarBasicExample" className="navbar-menu is-active">
        <div className="navbar-start">
          <Link to="/" className="navbar-item">Home </Link>
          <Link to="/location" className="navbar-item"> Locations </Link>
          <Link to="/events" className="navbar-item">Events </Link>
          <Link to="/users" className="navbar-item"> Users </Link>
        </div>

        <div className="navbar-end">
          <div className="navbar-item">
            {!logIn ?
              <div className="buttons">
                <Link to="/login" className="button is-info">
                  <strong>Login/Register</strong>
                </Link>
              </div> :
              <div className="buttons">
                <div className="column is-capitalized">
                  {userName && <strong>Hi {userName}</strong>}
                </div>
                <div className="column">
                  <Link to={'/event/create'} className="button is-link">
                    <strong>Create Event</strong>
                  </Link>
                </div>
                <div className="column">
                  <Link to={'/location/create'} className="button is-warning">
                    <strong>Create Location</strong>
                  </Link>
                </div>
                <div className="column">
                  <Link to={`/user/${userId}`} className="button is-info">
                    <strong>My Profile</strong>
                  </Link>
                </div>
                <button className="button is-primary" onClick={logOut}>
                  <strong>Log Out</strong>
                </button>
              </div>
            }
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar