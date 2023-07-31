import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './styles/index.css'

window.our = `~${window.ship}`

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
