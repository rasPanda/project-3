import React, { useState, useEffect } from 'react'
import Select from 'react-select'
import moment from 'moment'
import axios from 'axios'

export default function EventUpdateForm({ formData, updateFormData, changeEditState, id }) {
  const currentTime = moment().format('YYYY-MM-DDTHH:mm')
  let formTime = moment(formData.time, 'dddd, MMMM Do YYYY, h:mm a').format('YYYY-MM-DDTHH:mm')
  if (formTime === 'Invalid date') {formTime = currentTime}

  const [locationOptions, updateLocationsOptions] = useState([])
  const [locations, getLocations] = useState([])
  const token = localStorage.getItem('token')

  const [uploadSuccess, updateUploadSuccess] = useState(false)
  const [newFormData, updateNewFormData] = useState({ ...formData,  time: formTime, location: formData.location })
  const [errors, updateErrors] = useState({
    name: '',
    time: '',
    details: '',
    location: [],
  })
  console.log(newFormData)

  const locationName = newFormData.location.name
  const indexOfLocation = locationOptions.findIndex((location) => {
    return location.label === locationName
  })

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

  useEffect(() => {
    axios.get('/api/location')
      .then(({ data }) => {
        getLocations(data)
      })
  }, [])

  function handleFormChange(event) {
    const { name, value } = event.target
    updateNewFormData({ ...newFormData, [name]: value })
    updateErrors({ ...errors, [name]: '' })
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

  async function handleSave(newFormData) {
    // event.preventDefault()
    const selectedLocation = locations.find(location => location._id === newFormData.location.value)
    const timeStr = moment(newFormData.time).format('dddd, MMMM Do YYYY, h:mm a')
    const dataToSubmit = { ...newFormData, time: timeStr, location: selectedLocation }
    // const newFormData = { ...formData }
    try {
      const { data } = await axios.put(`/api/event/${id}`, dataToSubmit, {
        headers: { Authorization: `Bearer ${token}` }
      })
      // console.log(data)
      changeEditState(false)
      history.push(`/event/${id}`)
    } catch (err) {
      console.log(err.response.data)
      updateErrors(err.response.data.errors)
    }
  }

  return <form>
    <div className="field">
      <label className="label">
        Event Name
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
    <div className='field'>
      <label className='label'>Location</label>
      <div className='control'>
        <Select
          name='location'
          closeMenuOnSelect={true}
          defaultValue={locationOptions[indexOfLocation]}
          onChange={(location) => updateNewFormData({ ...newFormData, location })}
          options={locationOptions}
          value={locationOptions[indexOfLocation]}
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
          // defaultValue={newFormData.time}
          value={newFormData.time}
          onChange={handleFormChange}
          name={'time'}
        />
        {errors.time && <small className='has-text-danger'>{errors.time.message}</small>}
      </div>
    </div>
    <div className='field'>
    <label className='label'>Details</label>
      <div className='control'>
        <textarea
          className='textarea'
          type='text'
          value={newFormData.details}
          onChange={handleFormChange}
          name={'details'}
        />
        {errors.name && <small className='has-text-danger'>{errors.details.message}</small>}
      </div>
    </div>
    <div className="field">
      <button className="button is-hovered is-link" onClick={handleUpload}>Change event pic</button>
      {uploadSuccess && <div><small className="has-text-primary">Upload Complete, <br></br>save to see changes</small></div>}
    </div>

    <button className="button mt-5 is-success" onClick={() => {handleSave(newFormData)}}>Save</button>
  </form>
}