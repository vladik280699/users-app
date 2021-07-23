import React from 'react'

import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import './App.scss'

function App() {
  return <div className="App">
    <Header/>
    <div className="Content">
      Users app
    </div>
    <Footer/>
  </div>
}

export default App
