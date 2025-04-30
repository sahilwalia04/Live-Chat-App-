import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import App from '../App'
import Home from './Home'
import Signin from './Signin'
import Login from './Login'
import ProtectedRoute from './ProtectedRoute'

function SetRoutes() {
  return (
    <div>
      <BrowserRouter>
      <Routes>
        <Route element={<ProtectedRoute/>}> 
        <Route path='/' element={<Home/>}/>
        </Route>
        <Route path='/signin' element={<Signin/>}/>
        <Route path='/login' element={<Login/>}/>      
      </Routes>
      </BrowserRouter>
    </div>
  )
}

export default SetRoutes
