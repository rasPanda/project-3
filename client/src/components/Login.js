import React, { useState } from 'react'
import axios from 'axios'

export default function Login(history) {

  //* Login State and Functions

  const [loginData, updateLoginData] = useState({
    email: '',
    password: ''
  })

  const [loginErrors, updateLoginErrors] = useState({
    email: '',
    password: ''
  })

  function handleLoginChange(event) {
    const { name, value } = event.target
    updateLoginData({ ...loginData, [name]: value })
    updateLoginErrors({ ...loginErrors, [name]: '' })
  }

  async function handleLoginSubmit(event) {
    event.preventDefault()
    try {
      const { data } = await axios.post('/api/login', loginData)
      if (localStorage) {
        localStorage.setItem('token', data.token)
      }
      console.log(data.token)
      console.log('SUCCESS')
      history.goBack()
      //! If need be, add browser history to App.js
    } catch (err) {
      console.log(err.response.data.errors)
      updateLoginErrors(err.response.data.errors)
    }
  }

  return <form onSubmit={handleLoginSubmit}>
    <h2>Login</h2>
    <div className="field">
      <label className="label">Email</label>
      <div className="control">
        <input
          className="input"
          type="text"
          value={loginData.email}
          onChange={handleLoginChange}
          name={'email'}
        />
        {loginErrors.username && <small className="has-text-danger">{loginErrors.username} invalid</small>}
      </div>
    </div>
    <div className="field">
      <label className="label">Password</label>
      <div className="control">
        <input
          className="input"
          type="password"
          value={loginData.password}
          onChange={handleLoginChange}
          name={'password'}
        />
        {loginErrors.password && <small className="has-text-danger">{loginErrors.password}</small>}
      </div>
    </div>
    <button className="button">Submit</button>
  </form>
}