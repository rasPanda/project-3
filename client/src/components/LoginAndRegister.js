//! This is our login and register page
import React from 'react'
import Register from './Register'
import Login from './Login'

export default function LoginAndRegister({ history }) {




  return <div className="section">
    <div className="box columns">
      <div className="column is-half">
        {Register()}
      </div>
      <div className="column is-half">
        {Login(history)}
      </div>
    </div>
  </div>




}
