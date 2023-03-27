import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.scss'
import reportWebVitals from './reportWebVitals'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { LogIn } from './component/login/login'
import { Provider } from 'react-redux'
import { setupStore } from './redux/store'

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
)
root.render(
  <BrowserRouter>
    <Provider store={setupStore(undefined)}>
      <Routes>
        <Route path='/' element={ <LogIn /> } />
      </Routes>
    </Provider>
  </BrowserRouter>
)

reportWebVitals()
