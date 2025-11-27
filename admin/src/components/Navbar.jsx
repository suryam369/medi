
import React, { useContext, useState } from 'react'
import { AdminContext } from '../context/AdminContext'
import {useNavigate} from 'react-router-dom'
import { DoctorContext } from '../context/DoctorContext';

import medilogo from '../assets/medilogo.png'

const Navbar = () => {

    const {assets,aToken,setAToken} = useContext(AdminContext);
    const {dToken,setDToken} = useContext(DoctorContext)
    const navigate = useNavigate()

    const logout = () => {
        navigate('/')
        if(aToken){
          aToken && setAToken('')
          aToken && localStorage.removeItem('aToken')
        }
        if(dToken){
          dToken && setDToken('')
          dToken && localStorage.removeItem('dToken')
        }
    }
    
  return (
    <div className='flex items-center justify-between px-2 py-2 bg-white'>
        <div className='flex items-center gap-2'>
            <img className='w-48' src={medilogo} alt="" />
            <p className='bg-gray-600 p-2 text-white rounded-md'>{aToken?'Admin':'Doctor'}</p>
        </div>
        <div>
          <h1 className="hidden md:block font-lora  text-6xl font-bold bg-gradient-to-r from-sky-500 via-indigo-500 to-purple-500 bg-clip-text text-transparent tracking-wide animate-pulse">
            MEDI CONNECT
          </h1>
        </div>
        <button onClick={logout} className='bg-gray-600 text-white p-2 rounded-md text-md'>Logout</button>
    </div>
  )
}

export default Navbar