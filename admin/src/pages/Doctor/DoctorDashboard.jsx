import React, { useContext, useEffect } from 'react'
import { DoctorContext } from '../../context/DoctorContext'

import { assets } from '../../assets/assets';
import { AppContext } from '../../context/AppContext';

const DoctorDashboard = () => {

  const {dashData,getDashData,dToken,cancelAppointment,completeAppointment} = useContext(DoctorContext);
  const {currency,slotDateFormat} = useContext(AppContext);

  useEffect(()=>{
    if(dToken){
      getDashData();
    }
  },[dToken])

  return dashData && (
    <div className='m-5'>
      <div className='flex flex-wrap gap-3'>
        <div className='flex items-center gap-2 bg-blue-200 p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer transition-all ease-in-out duration-500 hover:scale-105' >
          <img className='w-14' src={assets.earning_icon} alt="" />
          <div>
            <p className='text-xl font-semibold text-gray-800'>{currency} {dashData.earnings}</p>
            <p className='text-gray-900'>Earnings</p>
          </div>
        </div>

        <div className='flex items-center gap-2 bg-blue-200 p-4 min-w-52 rounded-md border-2 border-gray-100 cursor-pointer transition-all ease-in-out duration-500 hover:scale-105'>
          <img className='w-12' src={assets.appointment_icon} alt="" />
          <div>
            <p className='text-xl font-semibold text-gray-800'>{dashData.appointments}</p>
            <p className='text-gray-900'>Appointments</p>
          </div>
        </div>

        <div className='flex items-center gap-2 bg-blue-200 p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer transition-all ease-in-out duration-500 hover:scale-105'>
          <img className='w-14' src={assets.patients_icon} alt="" />
          <div>
            <p className='text-xl font-semibold text-gray-800'>{dashData.patients}</p>
            <p className='text-gray-900'>patients</p>
          </div>
        </div>
      </div>
      <div className='bg-white'>
        <div className='flex items-center gap-2.5 px-4 py-4 mt-10 rounded-t border bg-gray-400'>
          <img src={assets.list_icon} alt="" />
          <p className='font-semibold'>Latest Bookings</p>
        </div>

        <div>
          {
            dashData.latestAppointments.map((item,index) => (
              <div className='flex items-center px-6 py-3 gap-3 hover:bg-gray-100 bg-slate-200 border-slate-300 border-1 border' key={index}>
                <img className='rounded-full w-10' src={item.userData.image} alt="" />
                <div className='flex-1 text-sm'>
                  <p className='text-gray-800 font-medium'>{item.userData.name}</p>
                  <p className='text-gray-800 font-medium'>{slotDateFormat(item.slotDate)}</p>
                </div>
                {
                  item.cancelled
                  ?<p className='text-red-400 text-xs font-medium'>cancelled</p>
                  :item.isCompleted
                  ?<p className='text-green-500 text-xs font-medium'>Completed</p>
                  :
                  <div className='flex '>
                    <img onClick={()=>cancelAppointment(item._id)} className='w-10 cursor-pointer' src={assets.cancel_icon} alt="" />
                    <img onClick={()=>completeAppointment(item._id)} className='w-10 cursor-pointer' src={assets.tick_icon} alt="" />      
                  </div>
                }
              </div>
            ))
          }
        </div>
      </div>
    </div>
  )
}

export default DoctorDashboard