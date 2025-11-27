import React, { useContext } from 'react'
import { AppContext } from '../context/AppContext'

const Contact = () => {

  const {assets} = useContext(AppContext);
  return (
    <div className='mb-24'>
      <div className='my-10 text-sm text-center md:text-2xl'>
        <p className='text-gray-500 font-lora'>CONTACT <span className='text-gray-700 font-lora'>US</span> </p>
      </div>
      <div className='flex flex-col items-center justify-center gap-4 mt-8 md:flex-row'>
        <div className='w-full md:w-1/4'>
          <img src={assets.contact_image} className='rounded-md' alt="" />
        </div>
        <div className='flex flex-col'>
          <div>
            <p className='mb-2 text-xl font-poppins'>OUR OFFICE</p>
            <p>Hyderabad,Jublie Hills</p>
            <p>50009387</p>
          </div>
          <div className='mb-2 leading-6'>
            <p>Tel:(+918988989892)</p>
            <p>Email:mediconnect@gmail.com</p>
          </div>
        
          <div>
            <p className='mb-2 text-xl leading-6 font-poppins'>CAREERS AT PRESCRIPTO</p>
            <p>Learn more about our team</p>
            <p className='p-2 mt-3 bg-gray-800 text-white border rounded-md w-28 hover:bg-gray-600 cursor-pointer'>Explore jobs</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Contact