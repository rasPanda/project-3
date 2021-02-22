import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import '../styles/style.scss'

const Home = () => {
  return (
    <div className="home-container">
      <div className="home-search-container">
        <div class="field">
          <div class="control">
            <input className="input is-success is-rounded is-focused is-medium" id="input-width" type="text" placeholder="Search for near location" />
          </div>
        </div>
        <div class="control">
          <Link to='/location' class="button is-success is-link">Search</Link>
        </div>
      </div>
    </div>
  )
}
export default Home