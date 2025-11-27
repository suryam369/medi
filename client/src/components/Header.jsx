import React, { useContext } from 'react'

import { AppContext } from '../context/AppContext'


const Header = () => {

  const {assets} = useContext(AppContext);

  return (
    <div className='flex flex-col flex-wrap items-start justify-between mt-5 bg-blue-500 rounded-lg md:flex-row '>
    {/* left side */}
    <div className='flex flex-col items-center gap-4 m-auto'>
        <p className='font-playfair text-3xl text-white md:text-4xl lg:text-5xl'>Book Appointment <br /> with Trusted Doctors</p>
        <div className='flex flex-col gap-2 text-white iteflems-center md:flex-row'>
            <img className='hidden md:block' src={assets.group_profiles} alt="" />
            <p className='font-inter' >Simply browse through our trusted doctors <br /> Schedule your appointment hassle-free</p>
        </div>
        <a href="#speciality" className='flex items-center px-3 py-3 text-gray-800 transition-transform bg-indigo-200 border rounded-lg hover:scale-110 w-44'>
            Book Appointment <img className='w-3' src={assets.arrow_icon} alt="" />
        </a>
    </div>

    {/* right side */}
    <div>
        <img src={assets.header_img} alt="" />
    </div>
    </div>
  )
}

export default Header