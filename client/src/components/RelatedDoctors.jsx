import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext'

const RelatedDoctors = ({special,docId}) => {

    const { doctors,navigate } = useContext(AppContext);

    const [doct,setDoct] = useState(null);
    
    useEffect(()=>{
        const filterdata = doctors.filter(item => item.speciality === special && item._id !== docId);
        setDoct(filterdata);
    },[docId,doctors,special])

  return (
    doct ? (
        <div>
        <div className='mt-8 text-sm text-center md:text-2xl'>
            <p>Related Doctors</p>
            <p className='mb-8 text-base'>please Browse through the extensive list of trusted doctors</p>
        </div>
        
        <div className='grid gap-4 grid-col-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5'>
            {
                doct.slice(0,5).map((item,index) => (
                    <div onClick={()=>{navigate(`/appointment/${item._id}`);window.scrollTo(0,0)}} className='overflow-hidden transition-transform duration-500 rounded-lg shadow-xl cursor-pointer hover:scale-105'>
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
        
    </div>
    ) :(
        <div>
            
        </div>
    )
    
  )
}

export default RelatedDoctors