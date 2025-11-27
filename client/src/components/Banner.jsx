import React, { useContext } from 'react'

import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext';

const Banner = () => {

    const navigate = useNavigate();

    const {assets} = useContext(AppContext)
    
  return (
    <div className='flex flex-col w-full px-6 my-20 mb-3 bg-blue-400 rounded-lg sm:flex-row sm:px-10 md:px-14 lg:px-14 '>
        <div className='flex flex-col items-center justify-center flex-1 w-full md:w-1/2 py-8 sm:py-10 md:py-16 lg:py-24 lg:pl-5'>
            <div className='flex flex-col gap-2 '>
                <p className='font-playfair text-2xl md:text-4xl text-white'>Book Appointment</p>
                <p className='font-playfair text-2xl md:text-4xl text-white'>With 100+ trusted Doctors</p>
                <button onClick={()=>navigate('/login')} className='float-left p-3 mt-3 text-gray-500 rounded-lg w-36 bg-slate-100 hover:bg-slate-300'>Create Account</button>
            </div>
        </div>
        <div className=' hidden w-1/2 md:block md:w-1/2 lg:w-[370px] relative'>
            <img className='absolute bottom-0 right-0 w-full max-w-md' src={assets.appointment_img} alt="" />
        </div>
    </div>
  )
}

export default Banner