import React, { useContext, useState } from 'react'
import { AdminContext } from '../../context/AdminContext'
import { toast } from 'react-toastify';
import axios from 'axios';

const AddDoctor = () => {

  const {assets} = useContext(AdminContext);

  const [docImg,setDocImg] = useState(false)
  const [name,setName] = useState('')
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')
  const [experience,setExperience] = useState('')
  const [about,setAbout] = useState('')
  const [speciality,setSpeciality] = useState('')
  const [degree,setDegree] = useState('')
  const [address1,setAddress1] = useState('')
  const [address2,setAddress2] = useState('')
  const [fees,setFees] = useState('')

  const {backendUrl,aToken} = useContext(AdminContext);

  const onsubmitHandler = async (e) => {
      e.preventDefault();

      try {
        
        if(!docImg){
          return toast.error("Image Not Selected")
        }

        const formData = new FormData();

        formData.append('image',docImg)
        formData.append('name',name)
        formData.append('email',email)
        formData.append('password',password)
        formData.append('experience',experience)
        formData.append('about',about)
        formData.append('speciality',speciality)
        formData.append('degree',degree)
        formData.append('address',JSON.stringify({line1:address1,line2:address2}))
        formData.append('fees',fees)


        formData.forEach((value,key) => {

          console.log(`${key} : ${value}`)

        })

        const res = await axios.post(backendUrl + '/api/admin/add-doctor',formData,{headers:{aToken}});

        if(res.data.success){
          toast.success(res.data.message);

          setName('')
          setEmail('')
          setPassword('')
          setAddress1('')
          setAddress2('')
          setDocImg(false)
          setExperience('')
          setFees('')
          setSpeciality('')
          setDegree('')
          setAbout('')

        }
        else{
          toast.error(res.data.message);
        }

      } catch (error) {
        toast.error(error.message);
      }

  }

  return (
    <form onSubmit={onsubmitHandler} className='w-[75%] my-5 mx-5 bg-gray-200 p-5'>
      <p className='font-medium text-2xl'>Add Doctor</p>
      <div className='flex items-center gap-3 m-3'>
        <label htmlFor="upload">
          <img  src={docImg ? URL.createObjectURL(docImg) :assets.upload_area} alt="" className='w-28 cursor-pointer' />
          <input onChange={(e) => setDocImg(e.target.files[0])} type="file" id='upload' hidden  />
        </label>
        <p className='text-lg'>Upload doctor <br />Picture</p>
      </div>

      <div className='w-full flex flex-col md:flex-row'>
        <div className='w-full md:w-1/2 flex flex-col'>
          <div className='flex flex-col m-2'>
            <label className='text-lg text-gray-700 mb-1' >Doctor Name</label>
            <input onChange={(e)=>setName(e.target.value)} value={name} type="text" className='border border-gray-500 p-1 rounded-md w-3/4'  />
          </div>
          <div className='flex flex-col m-2'>
            <label className='text-lg text-gray-700 mb-1'>Doctor Email</label>
            <input onChange={(e)=>setEmail(e.target.value)} value={email} type="email" className='border border-gray-500 p-1 rounded-md w-3/4'   />
          </div>

          <div className='flex flex-col m-2'>
            <label className='text-lg text-gray-700 mb-1' >Doctor Password</label>
            <input onChange={(e)=>setPassword(e.target.value)} value={password} type="password" className='border border-gray-500 p-1 rounded-md w-3/4'   />
          </div>

          <div className='flex flex-col m-2'>
            <label className='text-lg text-gray-700 mb-1' >Experience</label>
            <select onChange={(e)=>setExperience(e.target.value)} value={experience} className='border border-gray-500 p-1 rounded-md w-3/4' >
              <option value="" disabled>Select experience</option>
              <option value="1 year">1 year</option>
              <option value="2 year">2 year</option>
              <option value="3 year">3 year</option>
              <option value="4 year">4 year</option>
              <option value="5 year">5 year</option>
              <option value="6 year">6 year</option>
              <option value="7 year">7 year</option>
              <option value="8 year">8 year</option>
              <option value="9 year">9 year</option>
              <option value="10 year">10 year</option>

            </select>
            
          </div>

          <div className='flex flex-col m-2'>
            <label className='text-lg text-gray-700 mb-1' htmlFor="">Fees</label>
            <input onChange={(e)=>setFees(e.target.value)} value={fees} className='border border-gray-500 p-1 rounded-md w-3/4'  type="number" />
          </div>


        </div>
        <div className='w-full md:w-1/2'>
          <div className='flex flex-col m-2 '>
            <label className='text-lg text-gray-700 mb-1' htmlFor="">speciality</label>
            <select onChange={(e)=>setSpeciality(e.target.value)} value={speciality} className='border border-gray-500 p-1 rounded-md w-3/4' >
              <option value=""  disabled>Select specialist</option>
              <option value="General physician">General physician</option>
              <option value="Gynecologist">Gynecologist</option>
              <option value="Dermatologist">Dermatologist</option>
              <option value="Pediatricians">Pediatricians</option>
              <option value="Neurologist">Neurologist</option>
              <option value="Gastroenterologist">Gastroenterologist</option>
            </select>
          </div>

          <div className='flex flex-col m-2'>
            <label className='text-lg text-gray-700 mb-1' htmlFor="">Education</label>
            <input onChange={(e)=>setDegree(e.target.value)} value={degree} type="text" className='border border-gray-500 p-1 rounded-md w-3/4' />
          </div>

          <div className='flex flex-col m-2'>
            <label className='text-lg text-gray-700 mb-1' htmlFor="">Address</label>
            <input onChange={(e)=>setAddress1(e.target.value)} value={address1} type="text" className='border border-gray-500 p-1 rounded-md w-3/4 mb-2' placeholder='Address-1'  />
            <input onChange={(e)=>setAddress2(e.target.value)} value={address2} type="text" className='border border-gray-500 p-1 rounded-md w-3/4' placeholder='Address-2'  />
          </div>
        </div>
      </div>

      <div className='flex flex-col m-2'>
        <label className='text-lg text-gray-700 mb-1' htmlFor="">About</label>
        <textarea onChange={(e)=>setAbout(e.target.value)} value={about} className='border border-gray-500 p-1 rounded-md w-3/4' rows={5}></textarea>
      </div>

      <button type='submit' className='bg-indigo-500 text-white p-2 rounded-md m-2'>Add Doctor</button>
    </form>
  )
}

export default AddDoctor