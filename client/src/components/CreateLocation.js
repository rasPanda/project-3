import React, { useState } from 'react'
import axios from 'axios'
// import ReactMapGL from 'react-map-gl'

export default function CreateLocation() {

  // const [viewport, setViewport] = React.useState({
  //   width: '88vw',
  //   height: '70vh',
  //   latitude: 37.7577,
  //   longitude: -122.4376,
  //   zoom: 8
  // })

  // return (
  //   <div className="box" style={{ width: '93vw', height: '80vh', display: 'flex', justifyContent: 'center', borderRadius: '20px', margin: '100px auto 0 auto ', boxShadow: '0 5px 8px -2px black' }}>
  //     <ReactMapGL
  //       {...viewport}
  //       mapboxApiAccessToken='pk.eyJ1IjoicmFzcGFuZGEiLCJhIjoiY2tsaTcwN3d4MWY3YjJvcHJ3NXdzMDFhNCJ9.LzNGp4G0vsrfsnG-SXBGag'
  //       width="100%"
  //       height="100%"
  //       onViewportChange={(viewport) => setViewport(viewport)}
  //     />
  //   </div>
  // )

  const token = localStorage.getItem('token')

  const [locationData, updateLocationData] = useState({
    name: '',
    address: '',
    long: '',
    lat: '',
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
    long: '',
    lat: '',
    image: '',
    comments: []
  })

  const [creationSuccess, updateCreationSuccess] = useState(false)
  const [uploadSuccess, updateUploadSuccess] = useState(false)

  // useEffect(() => {
  //   axios.get('/api/location')
  //     .then(({ data }) => {
  //       getLocations(data)
  //       const locationArr = data.map(location => {
  //         return { value: location._id, label: location.name }
  //       })
  //       updateLocationsOptions(locationArr)
  //     })
  // }, [])

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
    // const timeStr = moment(eventData.time).format('dddd, MMMM Do YYYY, h:mm a')
    const dataToSubmit = {
      ...locationData, facilities: {
        numberOfTables: facilitiesData.numberOfTables,
        description: facilitiesData.description
      }
    }
    console.log(dataToSubmit)
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
        cloudName: 'dzoqli241',
        uploadPreset: 'PingPongImages',
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
    <div className='box'>
      <form onSubmit={handleSubmit}>
        <h2 className='title'>Add Location</h2>
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
          <label className='label'>Address</label>
          <div className='control'>
            <input
              className='input'
              type='text'
              value={locationData.address}
              onChange={handleChangeMain}
              name={'address'}
            />
            {errors.time && <small className='has-text-danger'>{errors.time.message}</small>}
          </div>
        </div>
        <div className='field'>
          <label className='label'>Description</label>
          <div className='control'>
            <textarea
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
        <div className='field'>
          <label className='label'>Number of Tables</label>
          <div className='control'>
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
        </div>


        <div className="field">
          <button className="button" onClick={handleUpload}>(Optional) Upload Location Image</button>
          {uploadSuccess && <div><small className="has-text-primary">Upload Complete</small></div>}
        </div>
        <button className="button">Submit</button>
        {creationSuccess && <div><small className="has-text-primary">Location Added! Redirecting...</small></div>}
      </form>
    </div>
  </main>


}