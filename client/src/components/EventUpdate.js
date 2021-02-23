import React, { useState, useEffect } from 'react'
import Select from 'react-select'
import moment from 'moment'
import axios from 'axios'

export default function EventUpdateForm({ formData, handleSave, handleFormChange, updateFormData }) {
  const currentTime = moment().format('YYYY-MM-DDTHH:mm')
  const [locationOptions, updateLocationsOptions] = useState([])

  // const inputFields = ['name', 'location', 'time', 'details']
  // const [errors, updateErrors] = useState({
  //   name: '',
  //   time: '',
  //   details: '',
  //   location: [],
  //   image: '',
  //   attendees: [],
  //   results: [{}],
  //   comments: []
  // })

  useEffect(() => {
    axios.get('/api/location')
      .then(({ data }) => {
        // getLocations(data)
        const locationArr = data.map(location => {
          return { value: location._id, label: location.name }
        })
        updateLocationsOptions(locationArr)
      })
  }, [])

  return <form>
    <div className="field">
      <label className="label">
        Event Name
      </label>
      <div className="control">
        <input
          className="input"
          type="text"
          value={formData.name}
          onChange={handleFormChange}
          name='name'
        />
        {/* {errors.name && <small className='has-text-danger'>{errors.name.message}</small>} */}
      </div>
    </div>
    <div className='field'>
      <label className='label'>Location</label>
      <div className='control'>
        <Select
          name='location'
          closeMenuOnSelect={true}
          // defaultValue={formData.location}
          onChange={(location) => updateFormData({ ...formData, location })}
          options={locationOptions}
          // value={formData.location}
        />
      </div>
    </div>
    <div className='field'>
    <label className='label'>Time</label>
      <div className='control'>
        <input
          className='input'
          type='datetime-local'
          min={currentTime}
          defaultValue={formData.time}
          // value={formData.time}
          onChange={handleFormChange}
          name={'time'}
        />
        {/* {errors.time && <small className='has-text-danger'>{errors.time.message}</small>} */}
      </div>
    </div>
    <div className='field'>
    <label className='label'>Details</label>
      <div className='control'>
        <textarea
          className='textarea'
          type='text'
          value={formData.details}
          onChange={handleFormChange}
          name={'details'}
        />
        {/* {errors.name && <small className='has-text-danger'>{errors.details.message}</small>} */}
      </div>
    </div>

    <button className="button mt-5 is-success" onClick={handleSave}>Save</button>
  </form>
}