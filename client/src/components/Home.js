import React, { useState, useEffect } from 'react'
import '../styles/style.scss'
import axios from 'axios'
import { debounce } from 'lodash'

const debouncedSave = debounce((query, updateSearchResults) => {
  axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${query}.json?country=gb&access_token=${process.env.MAPBOX_TOKEN}`)
    .then(({ data }) => {
      const search = data.features.map(location => {
        return {
          id: location.id,
          placeName: location.place_name,
          location: {
            lat: location.center[1],
            long: location.center[0]
          }
        }
      })
      updateSearchResults(search)
    })
}, 500)


export default function Home({ history }) {

  const [query, updateQuery] = useState('')
  const [search, updateSearch] = useState('')
  const [searchResults, updateSearchResults] = useState([])
  const [selectedLocation, updateselectedLocation] = useState({})

  useEffect(() => {
    debouncedSave(query, updateSearchResults)
  }, [query])


  function createSearchQuery(event) {
    updateQuery(event.target.value)
    updateSearch(event.target.value)
  }

  function handleSubmit(event) {
    event.preventDefault()
    history.push({
      pathname: '/location/',
      state: {
        place: selectedLocation
      }
    })
  }

  function handlePlaceSelect({ placeName, location }) {
    updateselectedLocation(location)
    updateSearchResults([])
    updateSearch(placeName)
  }

  return (
    <div className="home-container">

      <div className="home-search-container" id='fixedDropdown'>
        <p className="title has-text-white has-text-centered is-size-1">
          Park Pong
        </p>
        <form onSubmit={handleSubmit}>
          <div className="field is-grouped">
            <div className="control">
              <input
                className="input is-info is-rounded is-focused is-medium"
                id="input-width"
                type="text"
                placeholder="Search for a location near you!"
                onChange={createSearchQuery}
                value={search}
              />
            </div>
            <div className="control">
              <button className="button is-info is-medium">Search</button>
            </div>
          </div>
          {searchResults.length > 0 &&
            <div className='dropdown is-active is-fullwidth'>
              <div className='dropdown-menu'>
                <div className='dropdown-content'>
                  {searchResults.map((place) => {
                    return <div key={place.id}>
                      <div className='dropdown-item' id='cardHover' onClick={() => handlePlaceSelect(place)}>{place.placeName}</div>
                      <hr className="dropdown-divider"></hr></div>
                  })}
                </div>
              </div>
            </div>}
        </form>
      </div>
    </div>
  )
}