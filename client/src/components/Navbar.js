import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';


const Navbar = () => {
  const [logIn, updateLogin] = useState(false)
  useEffect(() => {
    const handleLogin = () => {
      const token = localStorage.getItem('token')
      if (token) {
        //change the button to logout
        updateLogin(true)
      }
    }
    handleLogin()
  }, [])

  //loggingOut
  const logOut = () => {
    localStorage.removeItem('token')
    location.reload()
  }

  return (
    <nav className="navbar" role="navigation" aria-label="main navigation">
      {/* <div className="navbar-brand">
        <a className="navbar-item" href="https://bulma.io">
          <img src="https://bulma.io/images/bulma-logo.png" width="112" height="28" />
        </a>

        <a role="button" className="navbar-burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div> */}

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
              <div className="buttons" onClick={logOut}>
                <button className="button is-primary">
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