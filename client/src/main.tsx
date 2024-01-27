import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const root = document.getElementById('root') as HTMLElement
const queryClient = new QueryClient()

const Main = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  )
}

ReactDOM
  .createRoot(root)
  .render(
    <React.StrictMode>
      <Main />
    </React.StrictMode>
  )
