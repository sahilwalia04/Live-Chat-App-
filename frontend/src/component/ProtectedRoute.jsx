import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Navigate, Outlet } from 'react-router-dom';

function ProtectedRoute() {
  const [isAuthenticated , setisAuthentivated] = useState(false) ;
  const [loading , setLoading] = useState(true) ;
  
   
  useEffect(()=>{
    const checkAuth = async ()=>{
      try{
        const response = await axios.get("http://localhost:8000/users",{
          withCredentials: true
        })
        console.log(response.data.success);
        if(response.data.success){
          setisAuthentivated(true)
          setLoading(false)
        }
      }catch(e){
        console.log(e);
        setisAuthentivated(false)
        setLoading(false)
      }
    } 
    checkAuth();
   const check = setInterval(() => {
      checkAuth();
    }, 1000*30);//30 seconds
    return ()=>{
        clearInterval(check);
    }
  })
  if(loading)
  {
    return <div className='flex items-center justify-center min-h-screen bg-gray-100'>
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Loading...</h1>
      </div>
    </div>
  }
  return isAuthenticated ? <Outlet/> : <Navigate to={"/login"}/>;
}

export default ProtectedRoute
