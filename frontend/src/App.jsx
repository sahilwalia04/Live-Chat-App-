import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import SetRoutes from './component/SetRoutes'
import { ToastContainer } from 'react-toastify'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <SetRoutes/>
        <ToastContainer/>
      </div>
    </>
  )
}

export default App
