import React, { useContext } from 'react'

import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext';


const TopDoctors = () => {

    const navigate = useNavigate();
    
    const {doctors} = useContext(AppContext);
    
  return (
    <div className='flex flex-col items-center mt-8'>
        <h1 className='text-4xl text-gray-600 font-lora'>Top Doctors to Book</h1>
        <p className='mb-3 text-lg font-inter'>simply Browse through the extensive list of trusted doctors</p>

        <div className='grid gap-4 grid-col-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5'>
            {
                doctors.slice(0,10).map((item,index) => (
                    <div onClick={()=>navigate(`/appointment/${item._id}`)} className='overflow-hidden transition-all ease-in-out duration-700 rounded-lg shadow-xl cursor-pointer hover:scale-105'>
                        <img className='bg-blue-100' src={item.image} alt="" />
                        <div className='flex items-center m-3'>
                            <p className={`w-3 h-3 p-1 mr-2 ${item.available ? 'bg-green-600' : 'bg-gray-500'}  rounded-full`}></p><p className={`${item.available ? 'text-green-600' : 'text-gray-500'}`}>{item.available ? 'Available' :'Not Available'}</p>
                        </div>
                        <p className='m-3 text-lg text-gray-800'>{item.name}</p>
                        <p className='m-3 text-sm text-gray-500'>{item.speciality}</p>
                    </div>
                ))
            }
        </div>

        <button onClick={()=>{navigate('/doctors');window.scrollTo(0,0)}} className='w-32 mb-10 bg-blue-300 rounded-lg cursor-pointer h-14 mt-9 hover:bg-blue-200'>More</button>
    </div>
  )
}

export default TopDoctors