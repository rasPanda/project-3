import React, { useState } from 'react'
import axios from 'axios'


export default function Register() {



  //* Registration State and functions
  const [regData, updateRegData] = useState({
    username: '',
    email: '',
    password: '',
    passwordConfirmation: '',
    image: 'https://res.cloudinary.com/dzoqli241/image/upload/v1614267313/f2b6e41cda9aed63ecbcd32de69b825a_kszij3.jpg',
    bio: '',
    location: ''
  })

  const [regErrors, updateRegErrors] = useState({
    username: '',
    email: '',
    password: '',
    passwordConfirmation: '',
    image: '',
    bio: '',
    location: ''
  })

  const [registrationSuccess, updateRegistrationSuccess] = useState(false)
  const [uploadSuccess, updateUploadSuccess] = useState(false)

  function handleRegChange(event) {
    const { name, value } = event.target
    updateRegData({ ...regData, [name]: value })
    // ! Whenever I make a change, I should remove any error for this particular field!
    updateRegErrors({ ...regErrors, [name]: '' })
  }

  async function handleRegSubmit(event) {
    event.preventDefault()
    try {
      const { data } = await axios.post('/api/register', regData)
      console.log(data)
      updateRegistrationSuccess(true)
    } catch (err) {
      console.log('hello', err.response.data.errors)
      updateRegErrors(err.response.data.errors)
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
        updateRegData({
          ...regData,
          image: `${result.info.secure_url}`
        })
        updateUploadSuccess(true)
      }
    ).open()
  }



  return <form onSubmit={handleRegSubmit}>
    <h2 className="title">Register</h2>
    <div className="field">
      <label className="label">Username</label>
      <div className="control">
        <input
          className="input"
          type="text"
          value={regData.username}
          onChange={handleRegChange}
          name={'username'}
        />
        {regErrors.username && <small className="has-text-danger">{regErrors.username.message}</small>}
      </div>
    </div>
    <div className="field">
      <label className="label">Email</label>
      <div className="control">
        <input
          className="input"
          type="text"
          value={regData.email}
          onChange={handleRegChange}
          name={'email'}
        />
        {regErrors.email && <small className="has-text-danger">{regErrors.email.message}</small>}
      </div>
    </div>
    <div className="field">
      <label className="label">Password</label>
      <div className="control">
        <input
          className="input"
          type="password"
          value={regData.password}
          onChange={handleRegChange}
          name={'password'}
        />
        {regErrors.password && <small className="has-text-danger">{regErrors.password.message}</small>}
      </div>
    </div>
    <div className="field">
      <label className="label">Confirm Password</label>
      <div className="control">
        <input
          className="input"
          type="password"
          value={regData.passwordConfirmation}
          onChange={handleRegChange}
          name={'passwordConfirmation'}
        />
        {regErrors.passwordConfirmation && <small className="has-text-danger">{regErrors.passwordConfirmation.message}</small>}
      </div>
    </div>
    <div className="field">
      <label className="label">Bio</label>
      <div className="control">
        <input
          className="input"
          type="text"
          value={regData.bio}
          onChange={handleRegChange}
          name={'bio'}
        />
        {regErrors.bio && <small className="has-text-danger">{regErrors.bio.message}</small>}
      </div>
    </div>
    <div className="field">
      <label className="label">Location</label>
      <div className="control">
        <input
          className="input"
          type="text"
          value={regData.location}
          onChange={handleRegChange}
          name={'location'}
        />
        {regErrors.location && <small className="has-text-danger">{regErrors.location.message}</small>}
      </div>
    </div>
    <div className="field">
      <button className="button is-hovered is-info" onClick={handleUpload}>Click to Upload Image</button>
      {uploadSuccess && <div><small className="has-text-primary">Upload Complete</small></div>}
    </div>
    <button className="button is-hovered is-primary">Submit</button>
    {registrationSuccess && <div><small className="has-text-primary">Registration Successful!</small></div>}
  </form>

}