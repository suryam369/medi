import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../context/AppContext';
import { useParams } from 'react-router-dom';
import RelatedDoctors from '../components/RelatedDoctors';
import { toast } from 'react-toastify';
import axios from 'axios';

const Appointment = () => {
  const { doctors, currency,assets,backendUrl,token,getAllDoctors,navigate,gtoken} = useContext(AppContext);
  const { docId } = useParams();
  const [doct, setDoctor] = useState(null);

  const daysOfWeek = ['SUN','MON','TUE','WED','THU','FRI','SAT']

  const [docSlots,setDocSlots] = useState([]);
  const [slotIndex,setSlotIndex] = useState(0);
  const [slotTime,setSlotTime] = useState('')

  const getAvialableslots = async () => {
    
    setDocSlots([]);

    //getting current Date
    let today = new Date();
    
    for(let i=0;i<7;i++){
      //getting current date with index
      let currentDate = new Date(today);
      currentDate.setDate(today.getDate() + i);
      
      //setting endtime of the date with index

      let endTime = new Date();
      endTime.setDate(today.getDate() + i);
      endTime.setHours(21,0,0,0);

      //setting hours

      if(today.getDate() === currentDate.getDate()){
        currentDate.setHours(currentDate.getHours() > 10 ? currentDate.getHours() + 1 : 10);
        currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0);
      }
      else{
        currentDate.setHours(10)
        currentDate.setMinutes(0); 
      }

      let timeSlots = [];

      while(currentDate < endTime){
        let formattedTime = currentDate.toLocaleTimeString([],{hour:'2-digit',minute:'2-digit'});
        
        
        let day = currentDate.getDate()
        let month = currentDate.getMonth() + 1;
        let year = currentDate.getFullYear();


        const slotDate = day + "-" + month + "-" + year
        const slotTime = formattedTime


        const isSlotAvailable = doct.slots_booked[slotDate] && doct.slots_booked[slotDate].includes(slotTime) ? false : true;

        
        //add slot to array
        if(isSlotAvailable){
          timeSlots.push({
            dateTime:new Date(currentDate),
            time:formattedTime
          })
        }

        //Increment current time by 30 min

        currentDate.setMinutes(currentDate.getMinutes() + 30);
      
      }
      
      setDocSlots(prev => ([...prev,timeSlots]));
      
    }

  }


  const bookAppointment = async () => {
    if (!token && !gtoken) {
      toast.warn('Login to book appointment');
      return navigate('/login');
    }
  
    try {
      const date = docSlots[slotIndex][0].dateTime;
  
      let day = date.getDate();
      let month = date.getMonth() + 1;
      let year = date.getFullYear();
  
      const slotDate = day + "-" + month + "-" + year;
  
      const headers = token
        ? { token }
        : { gtoken };
  
      const res = await axios.post(
        backendUrl + '/api/user/book-appointment',
        { docId, slotDate, slotTime },
        { headers }
      );
  
      if (res.data.success) {
        toast.success(res.data.message);
        getAllDoctors();
        navigate('/my-appointments');
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  

  useEffect(() => {
    const filtered = doctors.find(item => item._id === docId);
    setDoctor(filtered);
  }, [doctors, docId]);

  useEffect(()=>{
    if(doct){
      getAvialableslots();
    }
  },[doct])

  useEffect(()=>{
    console.log(docSlots);
  },[docSlots])

  return doct && (
    <div>
      {/* doctor details */}
      <div className='flex flex-col gap-4 mt-8 sm:flex-row'>
        <div>
          <img className='w-full rounded-lg bg-primary sm:max-w-72' src={doct.image} alt="" />
        </div>
        <div className='flex-1 p-8 mx-2 bg-white border border-gray-400 rounded-lg py-7 sm:mx-0 mt-[-80px] sm:mt-0'>
          <p className='flex items-center gap-2 text-2xl font-medium text-gray-900'>{doct.name}
            <img className='w-5' src={assets.verified_icon} alt="" />
          </p>
        
          <div className='flex items-center gap-2 mt-1 text-sm text-gray-500'>
            <p>{doct.degree} - {doct.speciality}</p>
            <button className='py-0.5 px-2 border text-xs rounded-full'>{doct.experience}</button>
          </div>
 
          <div>
            <p className='flex items-center gap-1 mt-3 text-sm font-medium text-gray-900'>About <img src={assets.info_icon} alt="" /></p>
            <p className='text-sm text-gray-500 max-w-[700px] mt-1'>{doct.about}</p>
          </div>

          <p className='mt-4 font-medium text-gray-500'>Appointment fee: <span className='text-gray-600'>{currency}{doct.fees}</span></p>
        </div>
      </div>



    {/* Booking slots */}

    <div className='mt-4 font-medium text-gray-700 sm:ml-72 sm:pl-4'>
      <p>Booking Slots</p>
      <div className='flex items-center w-full gap-3 mt-4 overflow-x-scroll'>
        {
          docSlots.length && docSlots.map((item,index) => (
            <div onClick={()=>setSlotIndex(index)} className={`text-center py-6 min-w-16 border-1 border-gray-400 rounded-full cursor-pointer ${slotIndex === index ? "bg-primary text-white":"border border-gray-300"}`} key={index}>
              <p>{item[0] && daysOfWeek[item[0].dateTime.getDay()]}</p>
              <p>{item[0] && item[0].dateTime.getDate()}</p>
            </div>
          ))
        }
      </div>

      <div className='flex items-center w-full gap-3 mt-4 overflow-scroll'>
        {
          docSlots.length > 0  && docSlots[slotIndex].map((item,index)=>(
            <p onClick={()=>setSlotTime(item.time)} className={`text-sm border-1 border-gray-400 font-light flex-shrink-0 px-5 py-2 rounded-full cursor-pointer ${item.time === slotTime ? 'bg-primary text-white' :'text-gray-700 border border-gray-300'}`} key={index}>
              {item.time.toLowerCase()}
            </p>
          ))
        }
      </div>

      <button onClick={bookAppointment} className='py-3 my-6 text-sm font-light text-white rounded-full bg-primary px-14'>Book an Appointment</button>
      
    </div>
      <div>
         <RelatedDoctors docId={docId} special={doct.speciality}/>
       </div>
    </div>
  );
};

export default Appointment;


