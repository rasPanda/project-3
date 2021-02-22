import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
//! Import Components here
import Navbar from './components/Navbar'
import Home from './components/Home'
import Users from './components/Users'
import SingleUser from './components/SingleUser'



import 'bulma'
import './styles/style.scss'

const App = () => (
  <BrowserRouter>
    {/* <Navbar /> */}
    <Switch>
      {/* <Route exact path="/" component={Home}/> */}
      <Route exact path="/users" component={Users}/>
      <Route exact path="/user/:id" component={SingleUser}/>
    </Switch>
  </BrowserRouter>
)

export default App