import React, { useState, useEffect } from 'react'
import Select from 'react-select'
import moment from 'moment'
import axios from 'axios'

export default function LocationUpdateForm({ formData, id, changeEditState }) {
  
  const [locationOptions, updateLocationsOptions] = useState([])
  const [locations, getLocations] = useState([])
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
    location: [],
  })

  function handleFormChange(event) {
    console.log(event.target)
    const { name, value } = event.target
    updateNewFormData({ ...newFormData, [name]: value })
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
      console.log(data)
      changeEditState(false)
      // history.push(`/user/${data._id}`)
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
          value={newFormData.address}
          onChange={handleFormChange}
          name='address'
        />
        {errors.name && <small className='has-text-danger'>{errors.name.message}</small>}
      </div>
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
    <button className="button mt-5 is-success" onClick={() => handleSave()}>Save</button>
  </form>
}