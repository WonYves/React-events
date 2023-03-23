import React, { Fragment } from 'react'
import MRoute from './router/route'
import { BrowserRouter } from '_react-router-dom@6.9.0@react-router-dom'
export default function App() {
  return (
    <BrowserRouter>
      <MRoute></MRoute>
    </BrowserRouter>
  )
}
