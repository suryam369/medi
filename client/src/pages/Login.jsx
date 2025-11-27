import {React,useContext,useEffect,useState} from 'react'
import { AppContext } from '../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const Login = () => {

  const [data,setData] = useState('Create Account');
  
  const [name,setname] = useState('');
  const [email,setemail] = useState('');
  const [password,setpassword] = useState('');

  const {token,setToken,backendUrl,navigate} = useContext(AppContext);

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      
      if(data === 'Create Account'){
        const res = await axios.post(backendUrl + '/api/user/register',{name,email,password});

        if(res.data.success){
          localStorage.setItem('token',res.data.token);
          setToken(res.data.token);
        }
        else{
          toast.error(res.data.message);
        }      
      }
      else{
        const res = await axios.post(backendUrl + '/api/user/login',{email,password});

          if(res.data.success){
            localStorage.setItem('token',res.data.token);
            setToken(res.data.token);
          }
          else{
            toast.error(res.data.message);
          }      
      }
    } catch (error) {
      toast.error(error.message);
    }
  }

  useEffect(()=>{
    if(token){
      navigate('/')
    }
  },[token])
  
  return (
    <form onSubmit = {submitHandler}>
      <div className='w-full p-6 m-auto my-20 rounded-lg shadow-xl shadow-gray-300 md:w-96'>
        <p className='my-2 text-2xl'>{data}</p>
        <p className='my-2 text-sm'>Please {data} for book Appointment</p>
        {data === "Create Account" ?<input onChange = {(e)=>setname(e.target.value)} value={name} className='w-full p-2 my-2 border border-gray-400 rounded-md' type="text" placeholder='User name' required /> :<></>}
        
        <input onChange = {(e)=>setemail(e.target.value)} value={email} className='w-full p-2 my-2 text-gray-500 border border-gray-400 rounded-md' type="email" placeholder='Enter email' required/>
        <input onChange = {(e)=>setpassword(e.target.value)} value={password} className='w-full p-2 my-2 text-gray-500 border border-gray-400 rounded-md' type="password" placeholder='password' required />
        <button type='submit' className='flex p-2 m-auto rounded-md bg-primary hover:bg-indigo-200'>{data}</button>

        {data === "Create Account" ?<p className="m-3">Already have an account?<span onClick={()=>setData('Login')} className='m-3 text-purple-400 cursor-pointer hover:text-blue-300'>Login here</span></p> :
        <p className="m-3">Dont have an account ? <span onClick={()=>setData('Create Account')} className='m-3 text-purple-400 cursor-pointer hover:text-blue-300'>Sign Up</span></p>}
        
      </div>
    </form>
  )
}

export default Login




