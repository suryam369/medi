import React, { useContext, useState,useEffect } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext';

import medilogo from '../assets/medilogo.png'

const Navbar = () => {

    const [showMenu,setShowMenu] = useState(false);
    
    const {assets,navigate,token,setToken,userData} = useContext(AppContext);

    const logout = () => {
        setToken(false);
        localStorage.removeItem('token');   
    }

    useEffect(() => {
        if (token) {
          navigate('/');
        }
      }, [token]);
    
  return (
    <div className='flex items-center justify-between'>
        <NavLink to='/'><img className='cursor-pointer w-44' src={medilogo} alt="" /></NavLink>
        <ul className='hidden gap-6 text-xl text-gray-800 md:flex'>
            <NavLink to='/'>
                <li className='py-1 font-rubik'>Home</li>
                <hr className='hidden h-0.5 bg-gray-400 border-none outline-none w-3/5 m-auto'/>
            </NavLink>
            <NavLink to='/doctors'>
                <li className='py-1 font-rubik'>All Doctors</li>
                <hr className='hidden h-0.5 bg-gray-400 border-none outline-none w-4/5 m-auto'/>
            </NavLink>
            <NavLink to='/about'>
                <li className='py-1 font-rubik'>About</li>
                <hr className='hidden h-0.5 bg-gray-400 border-none outline-none w-3/5 m-auto'/>
            </NavLink>
            <NavLink to='/contact'>
                <li className='py-1 font-rubik'>Contact</li>
                <hr className='hidden h-0.5 bg-gray-400 border-none outline-none w-3/5 m-auto'/>
            </NavLink>
        </ul>
        <div>
            <div className='flex justify-end gap-2'>
            {
                token && userData ?
                <div className='relative flex items-center gap-2 cursor-pointer group'>
                    <img src={userData.image} className='w-8 rounded-full' alt="" />
                    <img src={assets.dropdown_icon} alt="" />
                    <div className='absolute top-0 right-0 hidden pt-10 group-hover:block'>
                        <div className='flex flex-col gap-4 p-4 min-w-48 bg-gray-900 rounded'>
                            <p onClick={()=>navigate('/my-profile')} className='cursor-pointer text-white hover:text-blue-300'>My Profile</p>
                            <p onClick ={() => navigate('/my-appointments')} className='cursor-pointer text-white hover:text-blue-300'>My Appointments</p>
                            <p onClick={logout} className='cursor-pointer text-white hover:text-blue-300'>Logout</p>
                        </div>
                    </div>
                </div>
                :<button onClick={()=>navigate('/login')} className='hidden p-2 text-white rounded-lg bg-slate-500 md:block'>Create Account</button>
            }
            <img onClick={()=>setShowMenu(true)} className='md:hidden w-6 ' src={assets.menu_icon} alt="" />
            </div>
            <div className={`${showMenu?'w-full fixed':'hidden'} md:hidden right-0 top-0 bottom-0 z-20 overflow-hidden bg-white transition-all`}>
                <div className='flex items-center justify-between m-3'>
                    <img className='w-32' src={assets.logo} alt="" />
                    <img className='w-8' onClick={() => setShowMenu(false)}  src={assets.cross_icon} alt="" />
                </div>
                <ul className='flex flex-col gap-3'>
                    <NavLink to='/' onClick={()=>setShowMenu(false)}><p className='p-2 text-center  text-xl bg-stone-600 text-white'>Home</p></NavLink>
                    <NavLink to='/doctors' onClick={()=>setShowMenu(false)}><p className='p-2 text-center  text-xl bg-stone-600 text-white'>All Doctors</p></NavLink>
                    <NavLink to='/contact' onClick={()=>setShowMenu(false)}><p className='p-2 text-center  text-xl bg-stone-600 text-white'>Contact</p></NavLink>
                    <NavLink to='/about' onClick={()=>setShowMenu(false)}><p className='p-2 text-center  text-xl bg-stone-600 text-white'>About</p></NavLink>
                </ul>
            </div>
        </div>
    </div>
  )
}

export default Navbar