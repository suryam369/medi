import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { AppContext } from '../context/AppContext';

const Doctors = () => {

const { speciality } = useParams();
const { doctors,navigate } = useContext(AppContext);

const [showspecial,setShowspecial] = useState(false);

const [doct, setDoct] = useState([]);

useEffect(() => {
  const doctorsData = () => {
    if (!speciality) {
      setDoct(doctors);
    } else {
      const filtered = doctors.filter(item => item.speciality === speciality);
      setDoct(filtered);
    }
  };

  doctorsData();
}, [speciality, doctors]);



  return (
    <div >
    <div><p className='mt-6 md:text-2xl font-lora'>Browse through the doctors specialist</p>
    <div className='flex flex-col w-full mt-9 md:flex-row'>

      <button onClick={()=>setShowspecial(prev => !prev)} className={`py-1 px-3 border rounded text-md transition-all mb-2 sm:hidden w-40 ${showspecial ? 'bg-primary text-white' :'bg-gray-400'}`}>Filter</button>
      
      <div className={`flex-col  w-1/4 md:block ${showspecial ? 'flex':'hidden md:flex' }`}>
        
        <ul className='flex flex-col gap-3 mt-5 '>
          <li onClick={()=>{speciality===" "?navigate('/doctors'):navigate('/doctors/General physician')}} className={`w-40 p-1 text-white text-center border rounded-md cursor-pointer text-lg ${speciality !== "General physician" ? "bg-cyan-600" :"bg-gray-700"}`}>General physician</li>
          <li onClick={()=>{speciality===" "?navigate('/doctors'):navigate('/doctors/Gynecologist')}} className={`w-40 p-1 text-white text-center border rounded-md cursor-pointer text-lg ${speciality !== "Gynecologist" ? "bg-cyan-600" :"bg-gray-700"}`}>Gynecologist</li>
          <li onClick={()=>{speciality===" "?navigate('/doctors'):navigate('/doctors/Dermatologist')}} className={`w-40 p-1 text-white text-center border rounded-md cursor-pointer text-lg  ${speciality !== "Dermatologist" ? "bg-cyan-600" :"bg-gray-700"}`}>Dermatologist</li>
          <li onClick={()=>{speciality===" "?navigate('/doctors'):navigate('/doctors/Pediatricians')}} className={`w-40 p-1 text-white text-center border rounded-md cursor-pointer text-lg  ${speciality !== "Pediatricians" ? "bg-cyan-600" :"bg-gray-700"}`}>Pediatricians</li>
          <li onClick={()=>{speciality===" "?navigate('/doctors'):navigate('/doctors/Neurologist')}} className={`w-40 p-1 text-white text-center border rounded-md cursor-pointer text-lg ${speciality !== "Neurologist" ? "bg-cyan-600" :"bg-gray-700"}`}>Neurologist</li>
          <li onClick={()=>{speciality===" "?navigate('/doctors'):navigate('/doctors/Gastroenterologist')}} className={`w-40 p-1 text-white mb-2 text-center border rounded-md cursor-pointer text-lg ${speciality !== "Gastroenterologist" ? "bg-cyan-600" :"bg-gray-700"}`}>Gastroenterologist</li>
        </ul>
        
      </div>
      <div className='w-full'>
        <div className='grid gap-4 grid-col-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5'>
              {
                  doct.map((item,index) => (
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
        </div>
      </div>
    </div>
    </div>
  )
}

export default Doctors





