

import React, { useContext } from 'react'
import { AdminContext } from '../context/AdminContext'
import { NavLink } from 'react-router-dom'
import { DoctorContext } from '../context/DoctorContext'

const Sidebar = () => {
  const { aToken, assets } = useContext(AdminContext)
  const { dToken } = useContext(DoctorContext)

  const linkClass = ({ isActive }) =>
    `border border-r-4 flex gap-4 p-2 my-1 text-white transition-all duration-300 ${
      isActive ? 'border-r-blue-600 bg-slate-700' : 'bg-stone-600 hover:bg-slate-700'
    }`
  

  return (
    <div className="flex flex-col min-h-screen border-r-2 w-1/5 mt-2 gap-2 bg-gray-300">
      {aToken && assets && (
        <ul>
          <NavLink to="/admin-dashboard" className={linkClass}>
            <img src={assets.home_icon} alt="" />
            <p className="hidden md:block">Dashboard</p>
          </NavLink>
          <NavLink to="/all-appointments" className={linkClass}>
            <img src={assets.appointment_icon} alt="" />
            <p className="hidden md:block">Appointment</p>
          </NavLink>
          <NavLink to="/add-doctor" className={linkClass}>
            <img src={assets.add_icon} alt="" />
            <p className="hidden md:block">Add Doctor</p>
          </NavLink>
          <NavLink to="/doctor-list" className={linkClass}>
            <img src={assets.people_icon} alt="" />
            <p className="hidden md:block">Doctors List</p>
          </NavLink>
        </ul>
      )}

      {dToken && assets && (
        <ul>
          <NavLink to="/doctor-dashboard" className={linkClass}>
            <img src={assets.home_icon} alt="" />
            <p className="hidden md:block">Dashboard</p>
          </NavLink>
          <NavLink to="/doctor-appointments" className={linkClass}>
            <img src={assets.appointment_icon} alt="" />
            <p className="hidden md:block">Appointment</p>
          </NavLink>
          <NavLink to="/doctor-profile" className={linkClass}>
            <img src={assets.people_icon} alt="" />
            <p className="hidden md:block">Profile</p>
          </NavLink>
        </ul>
      )}
    </div>
  )
}

export default Sidebar
