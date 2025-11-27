import React, { useContext } from 'react'

import { Link } from 'react-router-dom'
import { AppContext } from '../context/AppContext'

const SpecialityMenu = () => {

  const {specialityData} = useContext(AppContext);

  return (
    <div id='speciality' className='flex flex-col items-center mt-10 text-lg text-gray-600'>
        <h1 className='text-4xl font-lora'>Find by Speciality</h1>
        <p className='font-inter'>simply browse the our extensive list of trusted doctors ,schedule your appointment</p>
        <div className='flex flex-col gap-4 mt-8 mb-8 md:flex-row '>
          {
              specialityData.map((item,index) => (
                  <Link onClick={() => window.scrollTo(0,0)} className='flex flex-col items-center cursor-pointer hover:translate-y-[-10px] transform-all duration-200' key={index} to={`/doctors/${item.speciality}`}>
                      <img className='w-24' src={item.image} alt="" />
                      <p>{item.speciality}</p>
                  </Link>
              ))
          }
        </div>
    </div>
  )
}

export default SpecialityMenu