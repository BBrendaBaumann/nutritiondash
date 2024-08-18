import React from 'react';
import './App.css'
import { Routes, Route } from 'react-router-dom'
import LandingPage from './pages/LandingPage'
import HomePage from './pages/HomePage'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaAppleAlt } from "react-icons/fa";

function App() {

  return (
    <div className="flex">
      <nav className="w-[10rem] bg-green-600 p-4 flex flex-col items-center text-white">
        <div className='flex items-center flex-col mt-3'>
        <FaAppleAlt className="text-4xl mb-1" />
        <h1 className="text-lg font-semibold">Gundo App</h1>
        </div>
      </nav>

      <main className="flex-1 p-6 bg-green-50">
        <Routes>
          <Route index element={<LandingPage />} />
          <Route path='/home/:recommendationId' element={<HomePage />} />
        </Routes>
      </main>

      <ToastContainer />
    </div>
  )
}

export default App