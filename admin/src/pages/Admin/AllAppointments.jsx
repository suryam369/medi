import React, { useContext, useEffect } from 'react'
import { AdminContext } from '../../context/AdminContext'
import { AppContext } from '../../context/AppContext';
import { assets } from '../../assets/assets';

const AllAppointments = () => {

  const {getAllAppointments,appointments,aToken,cancelAppointment} = useContext(AdminContext);

  const {calculateAge,slotDateFormat,currency} = useContext(AppContext);

  useEffect(()=>{
    if(aToken){
      getAllAppointments()
    }
  },[aToken])

  return (
    <div className='w-full max-w-6xl m-5'>
      <p className='mb-3 text-lg font-medium'>All Appointments</p>

      <div className='bg-white border rounded text-sm max-h-[80vh] min-h-[60vh] overflow-y-scroll'>
        <div className='hidden sm:grid grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] grid-flow-col py-3 px-6 border-b bg-gray-800 text-gray-100'>
          <p>#</p>
          <p>Patient</p>
          <p>Age</p>
          <p>Date & Time</p>
          <p>Doctor</p>
          <p>Fees</p>
          <p>Actions</p>
        </div>

        {
          appointments.map((item,index) => (
            <div className='flex flex-wrap justify-between max-sm:gap-2 sm:grid sm:grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] items-center  py-3 px-6 border-b border-slate-500 border-1  bg-slate-200 text-slate-800'>
              <p className='max-sm:hidden text-sm'>{index + 1}</p>
              <div className='flex items-center gap-2'>
                <img className='w-8 rounded-full' src={item.userData.image} alt="" /> <p>{item.userData.name}</p>
              </div>
              <p className='max-sm:hidden text-sm'>{calculateAge(item.userData.dob)}</p>
              <p className='text-sm'>{slotDateFormat(item.slotDate)},{item.slotTime}</p>
              <div className='flex items-center gap-2'>
                <img className='w-8 rounded-full bg-gray-200' src={item.docData.image} alt="" /> <p>{item.docData.name}</p>
              </div>
              <p className='text-sm'>{currency}{item.amount}</p>
              {
                item.cancelled
                ?<p className='text-red-600 text-sm font-medium'>Cancelled</p>
                :item.isCompleted 
                  ?<p className='text-green-700 text-sm font-medium'>Completed</p>
                  :<img onClick={()=>cancelAppointment(item._id)} className='w-10 cursor-pointer' src={assets.cancel_icon} alt="" />
              }

              
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default AllAppointments