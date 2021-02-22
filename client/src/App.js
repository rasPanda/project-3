import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
//! Import Components here
import Navbar from './components/Navbar'
import Home from './components/Home'
import EventsPage from './components/Events'
import SingleEventPage from './components/EventDetails'
import Users from './components/Users'
import SingleUser from './components/SingleUser'

import LoginAndRegister from './components/LoginAndRegister'


import 'bulma'
import './styles/style.scss'

const App = () => (
  <BrowserRouter>
    <Navbar />
    <Switch>
      <Route exact path="/" component={Home}/>
      <Route exact path="/events" component={EventsPage}/>
      <Route exact path="/event/:id" component={SingleEventPage}/>
      <Route exact path="/users" component={Users}/>
      <Route exact path="/user/:id" component={SingleUser}/>
      
      <Route exact path="/login" component={LoginAndRegister}/>
    </Switch>
  </BrowserRouter>
)

export default App