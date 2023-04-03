import React, { Fragment } from 'react'
import MRoute from './router/route'
import { BrowserRouter } from 'react-router-dom'
export default function App() {
  return (
    <BrowserRouter>
      <MRoute></MRoute>
    </BrowserRouter>
  )
}
