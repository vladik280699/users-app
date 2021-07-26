import React from 'react'
import {Provider} from 'react-redux'

import {store} from './services/store'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import UsersListPage from './pages/UsersListPage/UsersListPage'
import './App.scss'

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Header/>
        <div className="Content">
          <UsersListPage/>
        </div>
        <Footer/>
      </div>
    </Provider>
  )
}

export default App
