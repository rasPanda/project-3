import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import '../styles/style.scss'

const Home = () => {
  return (
    <div className="home-container">
      <div className="home-search-container">
        <div className="field">
          <div className="control">
            <input className="input is-info is-rounded is-focused is-medium" id="input-width" type="text" placeholder="Search for near location" />
          </div>
        </div>
        <div className="control">
          <Link to='/location' className="button is-info">Search</Link>
        </div>
      </div>
    </div>
  )
}
export default Home