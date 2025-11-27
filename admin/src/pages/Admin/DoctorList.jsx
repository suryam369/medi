import React, { useContext, useEffect } from 'react'
import { AdminContext } from '../../context/AdminContext'

const DoctorList = () => {

  const {aToken,doctors,getAllDoctors,changeAvailability} = useContext(AdminContext);

  useEffect(()=>{
    getAllDoctors();
  },[aToken])

  return (
    <div className='w-3/4 '>
      <h1 className='text-2xl m-8'>All Doctors</h1>

      <div className='w-full m-3 max-h-[80vh] overflow-y-scroll'>
        <div className='grid gap-4 grid-col-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5'>
              {
                  doctors.map((item,index) => (
                      <div className=' transition-transform duration-500 rounded-lg shadow-2xl cursor-pointer hover:scale-105 overflow-y-scroll'>
                          <img className='bg-blue-100' src={item.image} alt="" />
                          <div className='flex items-center m-3 gap-1'>
                              {/* <p className='w-3 h-3 p-1 mr-2 bg-green-600 rounded-full'></p><p className='text-green-500'>Available</p> */}
                              <input onClick={()=>changeAvailability(item._id)} type="checkbox" checked={item.available} />
                              <p>Available</p>
                          </div>
                          <p className='m-3 text-lg text-gray-800'>{item.name}</p>
                          <p className='m-3 text-sm text-gray-500'>{item.speciality}</p>
                      </div>
                  ))
              }
          </div>
        </div>
      
    </div>
  )
}

export default DoctorList