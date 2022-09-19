import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { Home, Login } from './container'

const App = () => {
  return (
    <div className='w-screen h-screen flex items-center justify-center'>
      <Routes>
        <Route path='/*' element={<Home />} />
        <Route path='/login' element={<Login />} />
      </Routes>
    </div>
  )
}

export default App