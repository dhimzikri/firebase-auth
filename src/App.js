import { data } from 'autoprefixer'
import { getAuth } from 'firebase/auth'
import React, { useEffect } from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom'
import { validateToken } from './api'
import { app } from './config/firebase.config'
import { Home, Login } from './container'
import { actionType } from './context/reducer'
import { useStateValue } from './context/StateProvider'

const App = () => {

  const firebaseAuth = getAuth(app);
  const [{ user }, dispatch] = useStateValue();
  const nav=useNavigate();

  useEffect (() => {
    firebaseAuth.onAuthStateChanged(userCred => {
      if (userCred) {
        userCred.getIdToken().then(token => {
          validateToken(token).then(res => {
            // console.log(userCred)
            dispatch({
              type: actionType.SET_USER,
              user: res.data,
            });
          });
        }) ;
      }else {
        nav("/login", { replace: true })
      }
    })
  }, [])

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