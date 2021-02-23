import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Select from 'react-select'
import moment from 'moment'

export default function CreateEvent() {
  const currentTime = moment().format('YYYY-MM-DDTHH:mm')
  const [eventData, updateEventData] = useState({
    name: '',
    time: `${currentTime}`,
    details: '',
    location: '',
    image: 'https://data.nssmag.com/images/galleries/12244/26032017-IMG-5266AnyOkolie.jpg',
    attendees: [],
    results: [{}],
    comments: []
  })

  const [errors, updateErrors] = useState({
    name: '',
    time: '',
    details: '',
    location: [],
    image: '',
    attendees: [],
    results: [{}],
    comments: []
  })

  const [locations, updateLocations] = useState([])
  const [creationSuccess, updateCreationSuccess] = useState(false)
  const [uploadSuccess, updateUploadSuccess] = useState(false)

  useEffect(() => {
    axios.get('/api/location')
      .then(({ data }) => {
        const locationArr = data.map(location => {
          return { value: location.name, label: location.name }
        })

        updateLocations(locationArr)
      })
  }, [])

  console.log(eventData)

  function handleChange(event) {
    const { name, value } = event.target
    updateEventData({ ...eventData, [name]: value })
    // ! Whenever I make a change, I should remove any error for this particular field!
    updateErrors({ ...errors, [name]: '' })
  }

  async function handleSubmit(event) {
    event.preventDefault()
    try {
      const { data } = await axios.post('/api/event', eventData)
      console.log(data)
      updateCreationSuccess(true)
    } catch (err) {
      console.log('hello', err.response.data.errors)
      updateErrors(err.response.data.errors)
    }
  }

  function handleUpload(event) {
    event.preventDefault()
    window.cloudinary.createUploadWidget(
      {
        cloudName: 'dzoqli241',
        uploadPreset: 'PingPongImages',
        cropping: true
      },
      (err, result) => {
        if (result.event !== 'success') {
          return
        }
        updateEventData({
          ...eventData,
          image: `${result.info.secure_url}`
        })
        updateUploadSuccess(true)
      }
    ).open()
  }

  return <main className='section'>
    <div className='box'>
      <form onSubmit={handleSubmit}>
        <h2 className='title'>Create Event</h2>
        <div className='field'>
          <label className='label'>Event Name</label>
          <div className='control'>
            <input
              className='input'
              placeholder='Pong in the park?'
              type='text'
              value={eventData.name}
              onChange={handleChange}
              name={'name'}
            />
            {errors.name && <small className='has-text-danger'>{errors.name.message}</small>}
          </div>
        </div>
        <div className='field'>
          <label className='label'>Time</label>
          <div className='control'>
            <input
              className='input'
              type='datetime-local'
              min={currentTime}
              value={eventData.time}
              onChange={handleChange}
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
              placeholder='Casual or tournament? Other info?'
              type='text'
              value={eventData.details}
              onChange={handleChange}
              name={'details'}
            />
            {errors.name && <small className='has-text-danger'>{errors.details.message}</small>}
          </div>
        </div>
        <div className='field'>
          <label className='label'>Location</label>
          <div className='control'>
            <Select
              name='location'
              closeMenuOnSelect={true}
              defaultValue={[]}
              onChange={(location) => updateEventData({ ...eventData, location })}
              options={locations}
              value={eventData.location}
            />
          </div>
        </div>


        <div className="field">
          <button className="button" onClick={handleUpload}>(Optional) Upload Event Image</button>
          {uploadSuccess && <div><small className="has-text-primary">Upload Complete</small></div>}
        </div>
        <button className="button">Submit</button>
        {creationSuccess && <div><small className="has-text-primary">Event Created!</small></div>}
      </form>
    </div>
  </main>

}