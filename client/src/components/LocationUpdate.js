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

export default function LocationUpdateForm({ formData, id, changeEditState }) {

  const [searchQuery, updateSearchQuery] = useState('')
  const [searchResults, updateSearchResults] = useState([])
  const token = localStorage.getItem('token')
  const [newFormData, updateNewFormData] = useState({
    ...formData,
    location: formData.location,
    numberTables: formData.facilities.numberOfTables,
    description: formData.facilities.description
  })
  const [uploadSuccess, updateUploadSuccess] = useState(false)
  const [errors, updateErrors] = useState({
    name: '',
    time: '',
    details: '',
    location: []
  })


  useEffect(() => {
    debouncedSave(searchQuery, updateSearchResults)
  }, [searchQuery])

  function createSearchQuery(event) {
    updateSearchQuery(event.target.value)
    updateNewFormData({ ...newFormData, search: event.target.value })
  }

  function handlePlaceSelect({ placeName, location }) {
    updateNewFormData({ ...newFormData, address: placeName, location: location, search: placeName })
    updateSearchQuery('')
    updateSearchResults([])
  }

  function handleFormChange(event) {

    const { name, value } = event.target
    updateNewFormData({ ...newFormData, [name]: value })
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
        updateNewFormData({
          ...newFormData,
          image: `${result.info.secure_url}`
        })
        updateUploadSuccess(true)
      }
    ).open()
  }

  async function handleSave() {
    const dataToSubmit = {
      ...newFormData,
      facilities: {
        numberOfTables: newFormData.numberTables,
        description: newFormData.description
      }
    }
    try {
      const { data } = await axios.put(`/api/location/${id}`, dataToSubmit, {
        headers: { Authorization: `Bearer ${token}` }
      })
      
      changeEditState(false)
    } catch (err) {
      console.log(err.response.data)
    }
  }

  return <form>
    <div className="field">
      <label className="label">
        Location Name
      </label>
      <div className="control">
        <input
          className="input"
          type="text"
          value={newFormData.name}
          onChange={handleFormChange}
          name='name'
        />
        {errors.name && <small className='has-text-danger'>{errors.name.message}</small>}
      </div>
    </div>
    <div className="field">
      <label className="label">
        Address
      </label>
      <div className="control">
        <input
          className="input"
          type="text"
          value={newFormData.search}
          onChange={createSearchQuery}
          name='address'
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
      {errors.name && <small className='has-text-danger'>{errors.name.message}</small>}
    </div>
    <div className="field">
      <label className="label">
        Number of Tables
      </label>
      <div className="control">
        <input
          className="input"
          type="text"
          value={newFormData.numberTables}
          onChange={handleFormChange}
          name='numberTables'
        />
        {errors.name && <small className='has-text-danger'>{errors.name.message}</small>}
      </div>
    </div>
    <div className='field'>
      <label className='label'>Description</label>
      <div className='control'>
        <textarea
          className='textarea'
          type='text'
          value={newFormData.description}
          onChange={handleFormChange}
          name={'description'}
        />
        {errors.name && <small className='has-text-danger'>{errors.details.message}</small>}
      </div>
    </div>
    <div className="field">
      <button className="button is-hovered is-link" onClick={handleUpload}>Change location image</button>
      {uploadSuccess && <div><small className="has-text-primary">Upload Complete, <br></br>save to see changes</small></div>}
    </div>
    <button className="button mt-5 is-success" onClick={() => handleSave()}>Save</button>
  </form>
}