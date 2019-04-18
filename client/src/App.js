import React from 'react'
import './App.css'
import Routes from './Routes'
import { Footer, Navbar } from './components'

const App = () => (
  <div className="App">
    <Navbar />
    <Routes />
    <Footer />
  </div>
)

export default App
