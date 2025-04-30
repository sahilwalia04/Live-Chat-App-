import axios from 'axios';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function Login() {
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;
    
    console.log("Form submitted", { email, password });
    try{

      const response = await axios.post("http://localhost:8000/users/login", {
        email: email,
        password: password
      },{
        withCredentials: true
      })
      console.log(response);
      toast.success("Login successful")
      navigate("/")
    }catch(e){
      console.log(e);
      toast.error("Login failed")
    }
    
  };
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Login</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="username" className="block text-gray-700 font-semibold mb-2">Email:</label>
            <input 
              type="text" 
              id="username" 
              name="email" 
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-gray-700 font-semibold mb-2">Password:</label>
            <input 
              type="password" 
              id="password" 
              name="password" 
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <button 
            type="submit" 
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300 font-semibold"
          >
            Login
          </button>
        </form>
        <p className='mt-2 '>Create the new account : <Link className='font-semibold  text-blue-800 underline' to={"/signin"} >Signin</Link> </p>
      </div>
    </div>
  );
}

export default Login;
