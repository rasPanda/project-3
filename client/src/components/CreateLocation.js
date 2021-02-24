import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { debounce } from 'lodash'

const debouncedSave = debounce((searchQuery, updateSearchResults) => {
  axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${searchQuery}.json?country=gb&access_token=${process.env.MAPBOX_TOKEN}`)
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

export default function CreateLocation({ history }) {

  const token = localStorage.getItem('token')

  const [locationData, updateLocationData] = useState({
    name: '',
    address: '',
    location: {
      lat: '',
      long: ''
    },
    image: 'https://data.nssmag.com/images/galleries/12244/26032017-IMG-5266AnyOkolie.jpg',
    comments: []
  })

  const [facilitiesData, updateFacilitiesData] = useState({
    numberOfTables: 1,
    description: ''
  })

  const [errors, updateErrors] = useState({
    name: '',
    address: '',
    numberOfTables: '',
    description: '',
    location: {
      lat: '',
      long: ''
    },
    image: '',
    comments: []
  })

  const [creationSuccess, updateCreationSuccess] = useState(false)
  const [uploadSuccess, updateUploadSuccess] = useState(false)
  const [searchQuery, updateSearchQuery] = useState('')
  const [searchResults, updateSearchResults] = useState([])


  useEffect(() => {
    debouncedSave(searchQuery, updateSearchResults)
  }, [searchQuery])


  function createSearchQuery(event) {
    updateSearchQuery(event.target.value)
    updateLocationData({ ...locationData, search: event.target.value })
  }

  function handlePlaceSelect({ placeName, location }) {
    updateLocationData({ ...locationData, address: placeName, location: location, search: placeName })
    updateSearchQuery('')
    updateSearchResults([])
  }

  function handleChangeMain(event) {
    const { name, value } = event.target
    updateLocationData({ ...locationData, [name]: value })
    // ! Whenever I make a change, I should remove any error for this particular field!
    updateErrors({ ...errors, [name]: '' })
  }

  function handleChangeFacilities(event) {
    const { name, value } = event.target
    updateFacilitiesData({ ...facilitiesData, [name]: value })
    // ! Whenever I make a change, I should remove any error for this particular field!
    updateErrors({ ...errors, [name]: '' })
  }

  async function handleSubmit(event) {
    event.preventDefault()
    const dataToSubmit = {
      ...locationData, facilities: {
        numberOfTables: facilitiesData.numberOfTables,
        description: facilitiesData.description
      }
    }
    try {
      const { data } = await axios.post('/api/location', dataToSubmit, {
        headers: { Authorization: `Bearer ${token}` }
      })
      updateCreationSuccess(true)
      setTimeout(() => {
        history.push(`/location/${data._id}`)
      }, 2000)
    } catch (err) {
      console.log('hello', err.response.data.errors)
      updateErrors(err.response.data.errors)
    }
  }

  function handleUpload(event) {
    event.preventDefault()
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
        updateLocationData({
          ...locationData,
          image: `${result.info.secure_url}`
        })
        updateUploadSuccess(true)
      }
    ).open()
  }

  return <main className='section'>
    <div className='columns is-centered'>
      <div className='column is-two-thirds'>
        <div className='box'>
          <h2 className='title'>Add Location</h2>
          <form className='columns' onSubmit={handleSubmit}>
            <div className='column'>
              <div className='field'>
                <label className='label'>Location Name</label>
                <div className='control'>
                  <input
                    className='input'
                    placeholder='Great spot in the park?'
                    type='text'
                    value={locationData.name}
                    onChange={handleChangeMain}
                    name={'name'}
                  />
                  {errors.name && <small className='has-text-danger'>{errors.name.message}</small>}
                </div>
              </div>
              <div className='field'>
                <label className='label'>Nearby address</label>
                <div className='control'>
                  <input
                    className='input'
                    placeholder='Search...'
                    type='text'
                    value={locationData.search}
                    onChange={createSearchQuery}
                    name={'search'}
                  />
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
                {errors.time && <small className='has-text-danger'>{errors.time.message}</small>}
              </div>
              <label className='label'>Number of Tables</label>
              <div className='field is-grouped'>
                <div className='control is-expanded'>
                  <input
                    className='input'
                    type='number'
                    min='1'
                    value={facilitiesData.numberOfTables}
                    onChange={handleChangeFacilities}
                    name={'numberOfTables'}
                  />
                  {errors.name && <small className='has-text-danger'>{errors.details.message}</small>}
                </div>
                <div className='control'>
                  <button className="button is-info is-hovered" onClick={handleUpload}>(Optional) Upload Location Image</button>
                  {uploadSuccess && <div><small className="has-text-primary">Upload Complete</small></div>}
                </div>
              </div>
              <div className="field">
                <div className='control'>
                  <button className="button is-primary is-hovered" id='submit'>Submit</button>
                  {creationSuccess && <div><small className="has-text-primary">Location Added! Redirecting...</small></div>}
                </div>
              </div>
            </div>
            <div className='column'>
              <div className='field'>
                <label className='label'>Description</label>
                <div className='control'>
                  <textarea
                    rows='10'
                    className='textarea'
                    placeholder='Tables behind the cafe, or next to the tennis courts?'
                    type='text'
                    value={facilitiesData.description}
                    onChange={handleChangeFacilities}
                    name={'description'}
                  />
                  {errors.name && <small className='has-text-danger'>{errors.details.message}</small>}
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </main>


}