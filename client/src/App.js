import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
//! Import Components here
import Users from './components/Users'
import SingleUser from './components/SingleUser'

// import Navbar from './components/Navbar'
// import Home from './components/Home'
import LoginAndRegister from './components/LoginAndRegister'


import 'bulma'
import './styles/style.scss'

const App = () => (
  <BrowserRouter>
    {/* <Navbar /> */}
    <Switch>
      {/* <Route exact path="/" component={Home}/> */}
      <Route exact path="/users" component={Users}/>
      <Route exact path="/user/:id" component={SingleUser}/>
      
      <Route exact path="/login" component={LoginAndRegister}/>
      <Route exact path="/" component={Home} />
    </Switch>
  </BrowserRouter>
)

export default App