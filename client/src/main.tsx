import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

const Main = () => {
  return (
    <App />
  )
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Main />
  </React.StrictMode>
)
