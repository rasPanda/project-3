import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
//! Import Components here
import Navbar from './components/Navbar'
import Home from './components/Home'



import 'bulma'
import './styles/style.scss'

const App = () => (
  <BrowserRouter>
    <Navbar />
    <Switch>
      <Route exact path="/" component={Home}/>
    </Switch>
  </BrowserRouter>
)

export default App