import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import SetRoutes from './component/SetRoutes'
import { ToastContainer } from 'react-toastify'

function App() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/users`)
      .then(res => res.json())
      .then(data => setMessage(data.message))
      .catch(err => console.error("API call failed", err));
  }, []);

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
