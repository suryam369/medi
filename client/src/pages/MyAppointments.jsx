import React, { useContext, useEffect,useState } from 'react'
import { AppContext } from '../context/AppContext'
import axios from 'axios';
import { toast } from 'react-toastify';


const MyAppointments = () => {

  

  const {token,backendUrl,getAllDoctors,navigate} = useContext(AppContext);

  const [appointments,setAppointments] = useState([]);

  const months = ["","Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

  const slotDateFormat = (slotDate) => {
      const dateArray = slotDate.split('-')

      return dateArray[0] + " "+months[Number(dateArray[1])] +" "+dateArray[2]
  }

  const getAllappointments = async () => {

      try {
      
        const res = await axios.get(backendUrl + '/api/user/appointments',{headers:{token}});
        if(res.data.success){
          setAppointments(res.data.appointments.reverse());
        }

      } catch (error) {
        toast.error(error.message);
      }
 
  }

  const cancelAppointments = async (appointmentId) => {
      try {
        
        const res = await axios.post(backendUrl + '/api/user/cancel-appointment',{appointmentId},{headers:{token}});

        if(res.data.success){
          toast.success(res.data.message);
          getAllappointments();
          getAllDoctors();
        }
        else{
          toast.error(res.data.message);
        }

      } catch (error) {
        toast.error(error.message);
      }
  }

  const initPay = (order) => {

    const options = {
      key:process.env.REACT_APP_RAZORPAY_KEY_ID,
      amount:order.amount,
      currency:order.currency,
      name:'Appointment Payment',
      description:'Appointment Payment',
      order_id:order.id,
      receipt:order.receipt,
      handler:async (response) => {
        try {
          
          const res =await axios.post(backendUrl + '/api/user/verifyRazorpay',response,{headers:{token}})

          if(res.data.success){
            getAllappointments()
            navigate('/my-appointments')
          }

        } catch (error) {
          toast.error(error.message)
        }
      }
    }

    const rzp = new window.Razorpay(options)
    rzp.open()

  }

  const appointmentRazorpay = async (appointmentId) => {
    try {
      
      const res = await axios.post(backendUrl + '/api/user/payment-razorpay',{appointmentId},{headers:{token}});

      if(res.data.success){
        initPay(res.data.order)
      }

    } catch (error) {
      toast.error(error.message);
    }
  }

  useEffect(()=>{
    if(token){
      getAllappointments();
    }
  },[token])

  return (
    <div>
      <p className='pb-3 mt-12 font-bold text-zinc-700 border-b font-lora'> MY APPOINTMENTS</p>
      <p className="text-sm text-zinc-800 mb-2 italic">
        You'll receive updates about your appointments via email. You can also view the latest status here.
      </p>
      <div>
        {
          appointments.map((item,index) => (
            <div className='grid grid-cols-[1fr_2fr] md:flex  gap-4 md:gap-6 py-2 shadow-gray-300 shadow-md border-t'>
              <div>
                <img className='w-32' src={item.docData.image} alt="" />
              </div>
              <div className='flex-1 text-sm text-zinc-600'>
                <p className='text-neutral-500 font-semibold mt-1'>{item.docData.name}</p>
                <p>{item.docData.speciality}</p>
                <p className='text-neutral-500 font-semibold mt-1'>Address:</p>
                <p className='text-xs mt-1'>{item.docData.address.line1}</p>
                <p className='text-xs mt-1'>{item.docData.address.line2}</p>
                <p className='text-md mt-1'>Date & time:<span className='text-neutral-700 font-semi-bold'>{slotDateFormat(item.slotDate)}, {item.slotTime}</span></p>
              </div>
              <div></div>
              <div className='flex flex-col my-6 gap-2 justify-end'>
                {!item.cancelled && item.payment && !item.isCompleted && <button className='text-sm text-white bg-blue-500 text-center sm:min-w-48 py-2 border   transition-all duration-300 rounded-lg'>paid</button>}
                {!item.cancelled && !item.payment && !item.isCompleted && <button onClick={()=>appointmentRazorpay(item._id)} className='text-sm text-stone-600 text-center sm:min-w-48 py-2 hover:bg-primary hover:text-white transition-all duration-300 rounded-lg border-gray-400 border-2'>Pay online</button> }
                {!item.cancelled && !item.isCompleted && <button onClick={() => cancelAppointments(item._id)} className='text-sm text-stone-600 text-center sm:min-w-48 py-2 border-gray-400 hover:bg-red-600 hover:text-white transition-all duration-300 rounded-lg border-2'>Cancel Appointment</button>} 
                {item.cancelled && !item.isCompleted && (<button className="text-md text-white bg-red-400 text-center sm:min-w-48 py-2 border transition-all duration-300 rounded-lg">
                {item.payment? "Appointment cancelled": "Appointment cancelled"}</button>)}
                {item.isCompleted && <button className='text-sm text-white bg-green-600 text-center sm:min-w-48 py-2 border   transition-all duration-300 rounded-lg'>Completed</button>}
              </div>
              
            </div>
            
          ))
        }
        
      </div>
    </div>
  )
}

export default MyAppointments