import React, { useState } from 'react'
import axios from 'axios'

export default function Login(history) {

  //* Login State and Functions

  const [loginData, updateLoginData] = useState({
    email: '',
    password: ''
  })

  const [loginErrors, updateLoginErrors] = useState(false)

  function handleLoginChange(event) {
    const { name, value } = event.target
    updateLoginData({ ...loginData, [name]: value })
  }

  async function handleLoginSubmit(event) {
    event.preventDefault()
    try {
      const { data } = await axios.post('/api/login', loginData)
      if (localStorage) {
        localStorage.setItem('token', data.token)
      }

      history.push('/')
      location.reload()

    } catch (err) {
      updateLoginErrors(true)
    }
  }

  return <form onSubmit={handleLoginSubmit}>
    <h2 className="title">Login</h2>
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
        {loginErrors && <small className="has-text-danger">Incorrect Login Details, Please Try Again</small>}
      </div>
    </div>
    <button className="button is-hovered is-primary">Submit</button>
  </form>
}