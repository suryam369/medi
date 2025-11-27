import React, { useContext, useEffect } from 'react'
import { AdminContext } from '../../context/AdminContext'
import { assets } from '../../assets/assets';
import { AppContext } from '../../context/AppContext';

const Dashboard = () => {

  const {aToken,getDashData,dashData,cancelAppointment} = useContext(AdminContext);

  const {slotDateFormat} = useContext(AppContext);

  useEffect(()=>{
    if(aToken){
      getDashData();
    }
  },[aToken])

  return dashData && (
    <div>
    <div className='m-5'>
        <div className='flex flex-wrap gap-3'>
          <div className='flex items-center gap-2 bg-blue-200  p-4 min-w-52 rounded-md border-2 border-gray-100 cursor-pointer transition-all ease-in-out duration-500 hover:scale-110' >
            <img className='w-14' src={assets.doctor_icon} alt="" />
            <div>
              <p className='text-xl font-semibold text-gray-600'>{dashData.doctors}</p>
              <p className='text-gray-800'>Doctors</p>
            </div>
          </div>

          <div className='flex items-center gap-2 bg-blue-200 p-4 min-w-52 rounded-md border-2 border-gray-100 cursor-pointer transition-all ease-in-out duration-500 hover:scale-110'>
            <img className='w-12' src={assets.appointment_icon} alt="" />
            <div>
              <p className='text-xl font-semibold text-gray-600'>{dashData.appointments}</p>
              <p className='text-gray-800'>Appointments</p>
            </div>
          </div>

          <div className='flex items-center gap-2 bg-blue-200 p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer transition-all ease-in-out duration-500 hover:scale-110'>
            <img className='w-14' src={assets.patients_icon} alt="" />
            <div>
              <p className='text-xl font-semibold text-gray-600'>{dashData.patients}</p>
              <p className='text-gray-800'>patients</p>
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
                  <img className='rounded-full w-10' src={item.docData.image} alt="" />
                  <div className='flex-1 text-sm'>
                    <p className='text-gray-800 font-medium'>{item.docData.name}</p>
                    <p className='text-gray-800 font-medium'>{slotDateFormat(item.slotDate)}</p>
                  </div>
                  {
                    item.cancelled
                    ?<p className='text-red-400 text-xs font-medium'>Cancelled</p>
                    :item.isCompleted 
                      ?<p className='text-green-500 text-xs font-medium'>Completed</p>
                      :<img onClick={()=>cancelAppointment(item._id)} className='w-10 cursor-pointer' src={assets.cancel_icon} alt="" />
                  }
                </div>
              ))
            }
          </div>
        </div>
    </div>
    </div>
  )
}

export default Dashboard