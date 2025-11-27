import React, { useContext, useState } from 'react'

import {AppContext} from '../context/AppContext'
import axios from 'axios';
import { toast } from 'react-toastify';

const MyProfile = () => {


  const {userData,setUserData,assets,backendUrl,loadingProfileData,token} = useContext(AppContext)

  

  const [isEdit,setisEdit] = useState(false);
  const [image,setImage] = useState(false);

  const updateUserProfile = async () => {

      try {

        const formData = new FormData();

        formData.append('name',userData.name);
        formData.append('phone',userData.phone);
        formData.append('address',JSON.stringify(userData.address));
        formData.append('gender',userData.gender);
        formData.append('dob',userData.dob);

        image && formData.append('image',image)

        const res = await axios.post(backendUrl + '/api/user/update-profile',formData,{headers:{token}});

        if(res.data.success){
          toast.success(res.data.message);
          await loadingProfileData();
          setisEdit(false)
          setImage(false)
        }
        else{
          toast.error(res.data.message);

        }
        
      } catch (error) {
        toast.error(error.message);
      }
  }


  return userData && (
    <div className='max-w-lg flex flex-col gap-2 text-sm my-6'>
        {
          isEdit 
          ?<label htmlFor="image">
            <div className='inline-block relative cursor-pointer'>
            <img className='w-36 rounded opacity-75' src={image ? URL.createObjectURL(image) : userData.image} alt="" />
            
            <img className='w-10 absolute bottom-12 right-12' src={image ? '' :assets.upload_icon} alt="" />
            </div>
            <input onChange={(e) => setImage(e.target.files[0])} type="file" hidden id="image" />
          </label>
          :<img className='w-36 rounded' src={userData.image ? userData.image :assets.profile_pic } alt="" />
        }

        

        {
          isEdit
          ? <input className='bg-gray-200 border border-gray-700 text-3xl font-medium max-w-60 mt-4 rounded-md p-1' type="text" onChange={(e) => setUserData(prev => ({...prev,name:e.target.value}))} value={userData.name} />
          : <p className='font-medium text-3xl text-neutral-800 mt-4'>{userData.name}</p>
        }

        <hr className='bg-zinc-300 h-[1px] border-none' />

        <div>
          <p className='text-neutral-500 mt-3'>CONTACT INFORMATION</p>
          <div className='grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-neutral-700'>
            <p className='font-medium'>Email id:</p>
            <p className='text-blue-500'>{userData.email}</p>
            <p className='font-medium'>Phone:</p>
            {
              isEdit
              ? <input type="text" className='bg-gray-200 border max-w-52 border-gray-700 rounded-md p-2' onChange={(e) => setUserData(prev => ({...prev,phone:e.target.value}))} value={userData.phone} />
              : <p className='text-blue-700'>{userData.phone}</p>
            }
            <p className='font-medium'>Address:</p>
            {
              isEdit
              ?<p className='flex gap-2 flex-col'>
                <input type='text' className='bg-gray-200 border border-gray-700 rounded-md p-2' onChange={(e) => setUserData(prev =>({...prev,address:{...prev.address,line1:e.target.value}}))} value={userData.address.line1} />
                <input type='text' className='bg-gray-200 border border-gray-700 rounded-md p-2' onChange={(e) => setUserData(prev =>({...prev,address:{...prev.address,line2:e.target.value}}))} value={userData.address.line2} />
              </p> 
              : <p className='text-blue-500'>
                {userData.address.line1}
                <br />
                {userData.address.line2}
              </p>
            }
          </div>

        </div>

        <div>
          <p className='text-neutral-500 mt-3'>BASIC INFORMATION</p>
          <div className='grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-neutral-700'>
            <p className='font-medium'>GENDER:</p>
            {
              isEdit ? 
              <select className='bg-gray-200 border border-gray-700 rounded-md p-2' onChange={(e)=>setUserData(prev => ({...prev,gender:e.target.value}))} value={userData.gender}>
                <option className=' bg-gray-200 border border-gray-700 rounded-md p-2' value="Male">Male</option>
                <option className=' bg-gray-200 border border-gray-700 rounded-md p-2' value="Female">Female</option>
              </select>
              :<p className='text-blue-500'>{userData.gender}</p>
            }

            <p className='font-medium'>Birthday:</p>
            {
              isEdit?<input className=' bg-gray-200 border border-gray-700 rounded-md p-2' type="date" onChange={(e)=>setUserData(prev => ({...prev,dob:e.target.value}))} value={userData.dob} />
              :<p className='text-blue-500'>{userData.dob}</p>
            }
          </div>
        </div>

        {
          isEdit?<button className='mt-2 border bg-slate-600 rounded-lg text-white p-2 w-40 m-auto hover:bg-slate-900' onClick={updateUserProfile}>Save Information</button>
          :<button className='mt-2 border bg-slate-600 rounded-lg text-white p-2 w-40 m-auto hover:bg-slate-900' onClick={() => setisEdit(true)}>Edit</button>
        }

    </div>
  )
}

export default MyProfile
