import React, { useContext } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import ProfilePage from './pages/ProfilePage'
import {Toaster} from "react-hot-toast"
import { AuthContext } from '../context/AuthContext.jsx'

const App = () => {
  const { authUser, isLoading } = useContext(AuthContext);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center w-full h-screen bg-[#020617] text-white relative overflow-hidden">
        {/* Ambient floating blobs */}
        <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-radial from-[#10B981]/10 via-transparent to-transparent blur-[100px] pointer-events-none" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] rounded-full bg-radial from-[#06B6D4]/10 via-transparent to-transparent blur-[100px] pointer-events-none" />
        <p className="text-slate-300 text-lg font-light tracking-widest relative z-10 animate-pulse">Loading ChatSphere...</p> 
      </div>
    );
  }

  return (
    <div className="bg-[#020617] min-h-screen text-slate-100 relative overflow-x-hidden font-sans select-none">
      {/* Background blobs for the entire app */}
      <div className="absolute top-[-10%] left-[-10%] w-[60vw] h-[60vw] rounded-full bg-radial from-[#10B981]/8 via-transparent to-transparent blur-[120px] pointer-events-none z-0" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[60vw] h-[60vw] rounded-full bg-radial from-[#06B6D4]/8 via-transparent to-transparent blur-[120px] pointer-events-none z-0" />
      <div className="absolute top-[20%] right-[15%] w-[45vw] h-[45vw] rounded-full bg-radial from-[#14B8A6]/6 via-transparent to-transparent blur-[120px] pointer-events-none z-0" />
      
      {/* Vignette effect */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_20%,#020617_90%)] pointer-events-none z-0" />
      
      <div className="relative z-10 w-full min-h-screen">
        <Toaster />
        <Routes>
          <Route path='/' element={authUser ? <HomePage /> : <Navigate to="/login" />} />
          <Route path='/login' element={!authUser ? <LoginPage /> : <Navigate to="/" />} />
          <Route path='/profile' element={authUser ? <ProfilePage /> : <Navigate to="/login" />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
