import React, { useContext, useState } from 'react'
import { AdminContext } from '../context/AdminContext';
import axios from 'axios'
import { toast } from 'react-toastify';
import { DoctorContext } from '../context/DoctorContext';

const Login = () => {
    const [state,setState] = useState('Admin');

    const [email,setemail] = useState(null);
    const [password,setpassword] = useState(null);

    const {setAToken,backendUrl} = useContext(AdminContext);
    const {setDToken} = useContext(DoctorContext)

    const submitHandler = async (e) => {
        e.preventDefault();
       
        try {
            
            if(state === 'Admin'){
                const res = await axios.post(backendUrl + '/api/admin/login',{email,password});

                if(res.data.success){
                    localStorage.setItem('aToken',res.data.token)
                    setAToken(res.data.token);
                }
                else{
                    toast.error(res.data.message);
                }
            }
            else{
                const res = await axios.post(backendUrl + '/api/doctor/login',{email,password});

                if(res.data.success){
                    localStorage.setItem('dToken',res.data.token)
                    setDToken(res.data.token);
                }
                else{
                    toast.error(res.data.message);
                }
            }
            
        
        } catch (error) {
            
        }
    }

  return (
    <form className='flex items-center justify-center my-32' onSubmit={submitHandler}>
        <div className='flex flex-col min-w-[320px] sm:min-w-96 shadow-lg rounded-md p-3 m-10'>
            <p className='font-semibold text-indigo-400 text-2xl'>{state} <span className='text-gray-600'>Login</span></p>
            <div className='flex flex-col gap-2'>
                <input onChange={(e) => setemail(e.target.value)} value={email} className='border border-gray-500 p-2 rounded-sm my-2 placeholder-gray-800' type="email" placeholder='Enter email...'  required/>
                <input onChange={(e) => setpassword(e.target.value)} value={password} className='border border-gray-500 p-2 rounded-sm my-2 placeholder-gray-800' type="password" placeholder='Enter password...' required/>
                <button className='bg-purple-500 text-white p-2 rounded-sm my-2'>Login</button>
            </div>
            <div>
                {
                    state === 'Admin' ? <p >Doctor Login ? <span onClick={()=>setState('Doctor')} className='text-blue-400 underline text-md cursor-pointer'>Click here</span></p> 
                    : <p >Admin Login ? <span onClick={()=>setState('Admin')} className='text-blue-400 underline text-md cursor-pointer'>Click here</span></p>
                }
            </div>
        </div>
    </form>
  )
}

export default Login